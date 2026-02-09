-- Inserts

INSERT INTO categories (description) VALUES
  ('heart rate'),
  ('steps'),
  ('sleep'),
  ('calories');

INSERT INTO individuals (id, email, password) VALUES ('d5412a03-1f23-4507-ace2-d9a342d41c93', 'test@uzh.ch', 'test123456');

INSERT INTO individual_devices (individual_id, manufacturer, model) VALUES
	('d5412a03-1f23-4507-ace2-d9a342d41c93', 'fitbit', 'charge_4'),
	('d5412a03-1f23-4507-ace2-d9a342d41c93', 'garmin', 'venu_4');

INSERT INTO individual_categories (category_id, unit, device_id) VALUES
	(1, 'bpm', 1),
	(1, 'bpm', 2),
	(2, '', 1),
	(3, 'min', 1),
	(4, 'kcal', 1),
	(4, 'kcal', 2);

INSERT INTO datastreams (individual_category_id, created_at, value) VALUES
  (1, now() - interval '7 days',  58.0),
  (2, now() - interval '1 day',   61.2),
  (3, now(),                     63.4),
  (4, now() - interval '20 day',   74.1),
  (5, now() - interval '10 day',   44.1),
  (6, now() - interval '30 day',   84.1);
