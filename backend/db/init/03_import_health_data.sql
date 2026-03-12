CREATE OR REPLACE FUNCTION load_hr()
RETURNS void
LANGUAGE plpython3u
AS $$
import pandas as pd

upper_bound = 3
hrs = []

for h in range(1,upper_bound+1):
	df = pd.read_json(f"/docker-entrypoint-initdb.d/data/hr{h}.json")
	df[0] = pd.to_datetime(df[0], unit='ms')
	hrs.append(df)

today = pd.Timestamp.today().normalize()
start_date = today - pd.DateOffset(months=13)
past_dates = pd.date_range(start=start_date, end=today, freq="D", tz="Europe/Zurich")
dfs = []

for day in past_dates:
	idx = day.weekday() % upper_bound
	hr_df = hrs[idx].copy()
	hr_df[0] = day + (hr_df[0] - hr_df[0].dt.normalize())
	dfs.append(hr_df)

final_df = pd.concat(dfs, ignore_index=True)
final_df[0] = final_df[0].dt.to_pydatetime()

plan = plpy.prepare(
    "INSERT INTO datastreams (individual_category_id, created_at, value) VALUES ($1, $2, $3)",
    ["bigint", "timestamptz", "double precision"]
)

for row in final_df.itertuples(index=False):
    plpy.execute(plan, [1, row[0], row[1]])
$$;


SELECT load_hr();
