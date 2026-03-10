CREATE OR REPLACE FUNCTION load_hr()
RETURNS void
LANGUAGE plpython3u
AS $$
import pandas as pd

df = pd.read_json('/docker-entrypoint-initdb.d/data/hr1.json')

# Milliseconds to seconds
df[0] = df[0]/1000.0

plan = plpy.prepare(
    "INSERT INTO datastreams (individual_category_id, created_at, value) VALUES ($1, to_timestamp($2), $3)",
    ["bigint", "double precision", "double precision"]
)

for row in df.itertuples(index=False):
    plpy.execute(plan, [1, row[0], row[1]])
$$;


SELECT load_hr();
