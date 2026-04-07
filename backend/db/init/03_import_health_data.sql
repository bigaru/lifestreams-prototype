CREATE OR REPLACE FUNCTION load_hr()
RETURNS void
LANGUAGE plpython3u
AS $$
import pandas as pd
import numpy as np

upper_bound = 11
hrs = []

for h in range(1,upper_bound+1):
	df = pd.read_json(f"/docker-entrypoint-initdb.d/data/hr{h}.json")
	df[0] = pd.to_datetime(df[0], unit='ms')
	hrs.append(df)

today = pd.Timestamp.today().normalize()
start_date = today - pd.DateOffset(months=18)
past_dates = pd.date_range(start=start_date, end=today, freq="D", tz="Europe/Zurich")
dfs = []

weights = np.array([10, 10, 1, 10, 10, 10, 6, 10, 10, 3, 10])
weights = weights/weights.sum()
rand_indices = np.random.choice(len(hrs), p=weights, size=len(past_dates))

for idx, day in enumerate(past_dates):
	selected_idx = rand_indices[idx]
	hr_df = hrs[selected_idx].copy()
	hr_df[0] = day + (hr_df[0] - hr_df[0].dt.normalize())
	dfs.append(hr_df)

final_df = pd.concat(dfs, ignore_index=True)
final_df[0] = final_df[0].dt.to_pydatetime()

plan = plpy.prepare(
    "INSERT INTO datastreams (individual_category_id, created_at, value) VALUES ($1, $2, $3)",
    ["uuid", "timestamptz", "double precision"]
)

for row in final_df.itertuples(index=False):
    plpy.execute(plan, ['aca1d946-d481-4a77-928e-b172dd535e44', row[0], row[1]])
$$;


SELECT load_hr();
