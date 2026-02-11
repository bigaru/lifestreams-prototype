-- Inserts

INSERT INTO categories (description, classes) VALUES
  ('Heart Rate', '{"Health", "Heart"}' ),
  ('Step Count', '{"Health", "Movement"}' ),
  ('Sleep', '{"Health", "Sleep"}' ),
  ('ECG', '{"Health", "Heart"}' ),
  ('Body Weight', '{"Health"}' ),
  ('Calories Burned', '{"Health"}' ),
  ('Social Activity', '{"Social"}');

INSERT INTO individuals (id, email, password) VALUES ('d5412a03-1f23-4507-ace2-d9a342d41c93', 'test@uzh.ch', 'test123456');

INSERT INTO individual_devices (individual_id, manufacturer, model) VALUES
	('d5412a03-1f23-4507-ace2-d9a342d41c93', 'fitbit', 'charge_4'),
	('d5412a03-1f23-4507-ace2-d9a342d41c93', 'garmin', 'venu_4');

INSERT INTO individual_categories (category_id, unit, device_id) VALUES
	(1, 'bpm', 1),
	(2, '', 2),
	(3, 'h', 1),
	(4, 'bpm', 1),
	(5, 'kg', 1),
	(6, 'kcal', 2),
	(7, 'h', 2);

INSERT INTO datastreams (individual_category_id, created_at, value) VALUES
  (1, now() - interval '7 days',  58.0),
  (2, now() - interval '1 day',   6200.0),
  (3, now(),                      7.5),
  (4, now() - interval '20 day',  110.0),
  (5, now() - interval '10 day',   88.4),
  (6, now() - interval '30 day',   2850.0),
  (6, now() - interval '60 day',   3.5);
