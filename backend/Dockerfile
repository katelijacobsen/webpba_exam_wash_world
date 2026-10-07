# Stage 1: prepare the Python dependencies
FROM python:3.12-slim AS builder

WORKDIR /build

COPY requirements.txt ./

RUN python -m venv --without-pip /opt/venv \
    && python -m pip --python /opt/venv install \
       --no-cache-dir -r requirements.txt


# Stage 2: assemble the application image
FROM python:3.12-slim AS runtime

ENV PATH="/opt/venv/bin:$PATH"

WORKDIR /app

RUN useradd --create-home appuser \
    && chown appuser:appuser /app

COPY --from=builder /opt/venv /opt/venv

COPY --chown=appuser:appuser . /app

USER appuser

CMD ["flask", "run", "--host=0.0.0.0", "--port=8000", "--debug", "--reload"]