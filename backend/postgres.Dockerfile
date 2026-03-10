FROM postgres:18

RUN apt-get update \
 && apt-get install -y --no-install-recommends \
      postgresql-plpython3-18 \
      python3-pandas \
 && rm -rf /var/lib/apt/lists/*
