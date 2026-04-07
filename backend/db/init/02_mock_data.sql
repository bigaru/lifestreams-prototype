-- Inserts

INSERT INTO categories (category, classes) VALUES
  ('heart_rate', '{"health", "heart"}' ),
  ('step_count', '{"health", "movement"}' ),
  ('sleep', '{"health", "sleep"}' ),
  ('ecg', '{"health", "heart"}' ),
  ('body_weight', '{"health"}' ),
  ('calories_burned', '{"health"}' ),
  ('social_activity', '{"social"}');

INSERT INTO individuals (id, email, password) VALUES ('d5412a03-1f23-4507-ace2-d9a342d41c93', 'test@uzh.ch', 'test123456');

INSERT INTO individual_devices (individual_id, manufacturer, model) VALUES
	('d5412a03-1f23-4507-ace2-d9a342d41c93', 'fitbit', 'charge_4'),
	('d5412a03-1f23-4507-ace2-d9a342d41c93', 'garmin', 'venu_4');

INSERT INTO individual_categories (id, category, unit, device_id) VALUES
	('aca1d946-d481-4a77-928e-b172dd535e44', 'heart_rate', 'bpm', 1),
	('f3c4a67f-2585-4b0a-87f8-c61604e9d174', 'step_count', 'none', 2),
	('11d908f8-7fb2-45bf-8813-c29273caa521', 'sleep', 'h', 1),
	('a948b9fa-0c2d-44ed-b701-f56154888be3', 'ecg', 'bpm', 1),
	('70c420b9-237a-48da-9cc0-58cb458fa07c', 'body_weight', 'kg', 1),
	('c60f79d2-159d-488e-a8da-479b25411af3', 'calories_burned', 'kcal', 2),
	('1c9f1b09-af48-4b85-a60b-6d2c36b120f0', 'social_activity', 'h', 2);

INSERT INTO datastreams (individual_category_id, created_at, value) VALUES
  --('aca1d946-d481-4a77-928e-b172dd535e44', now() - interval '7 days',  58.0),
  ('f3c4a67f-2585-4b0a-87f8-c61604e9d174', now() - interval '1 day',   6200.0),
  ('11d908f8-7fb2-45bf-8813-c29273caa521', now(),                      7.5),
  ('a948b9fa-0c2d-44ed-b701-f56154888be3', now() - interval '20 day',  110.0),
  ('70c420b9-237a-48da-9cc0-58cb458fa07c', now() - interval '10 day',   88.4),
  ('c60f79d2-159d-488e-a8da-479b25411af3', now() - interval '30 day',   2850.0),
  ('1c9f1b09-af48-4b85-a60b-6d2c36b120f0', now() - interval '60 day',   3.5);
