# MiniKassenbuch
<p align="center">
  <img style="background-color:black" src="http://torsten-simon.de/pub/kassenbuch/badge.png">
</p>
<p>
A simple PHP and Javascript application to manage accounting (for german law)

Eine simple PHP &amp; Javascript Applikation zum führen einfacher Kassenbücher &amp; Vereinskassen
</p>

# Build Status
[![PHP Composer](https://github.com/TSGames/MiniKassenbuch/actions/workflows/php.yml/badge.svg?branch=master)](https://github.com/TSGames/MiniKassenbuch/actions/workflows/php.yml)

# Installation

## Docker Compose (Recommended for local development & single-server deployment)

### Quick Start
```bash
git clone https://github.com/TSGames/MiniKassenbuch
cd MiniKassenbuch
docker-compose up -d
```

Access the application at [http://localhost:8080/](http://localhost:8080/)

### Production Deployment with Docker Compose
For production use, create a `docker-compose.yml` based on the provided template and configure:

```bash
cp docker-compose.yml docker-compose.production.yml
# Edit docker-compose.production.yml with your settings
docker-compose -f docker-compose.production.yml up -d
```

### Development with Docker Compose
```bash
docker-compose -f docker-compose.dev.yml up
```

This uses live-reload for both frontend (ng serve) and backend development.

## Kubernetes with Helm

### Installation from GHCR Registry

1. **Add the Helm repository** (optional, for future releases):
```bash
helm registry login ghcr.io
helm pull oci://ghcr.io/tsgames/minikassenbuch --version <VERSION>
```

2. **Install the chart**:
```bash
helm install mini-kassenbuch oci://ghcr.io/tsgames/minikassenbuch --version <VERSION>
```

3. **With custom values**:
```bash
helm install mini-kassenbuch oci://ghcr.io/tsgames/minikassenbuch \
  --version <VERSION> \
  --values my-values.yaml
```

### Upgrade
```bash
helm upgrade mini-kassenbuch oci://ghcr.io/tsgames/minikassenbuch --version <VERSION>
```

### Helm Configuration
The chart supports the following key values:

```yaml
replicaCount: 1

image:
  repository: ghcr.io/tsgames/minikassenbuch
  tag: latest

ingress:
  enabled: true
  className: nginx
  hosts:
    - host: minikassenbuch.example.com
      paths:
        - path: /
          pathType: Prefix

persistence:
  enabled: true
  size: 10Gi
  storageClassName: standard

resources:
  requests:
    memory: "128Mi"
    cpu: "100m"
  limits:
    memory: "512Mi"
    cpu: "500m"
```

See `helm/values.yaml` for all available configuration options.

# Ziel
Ziel soll es sein, eine offene, kostenfreie Plattform für die Verwaltung von Kassenbeständen oder Konten durchzuführen. Einfache Statistiken sollen bei der Auswertung helfen.

Das System ist insbesondere an Vereine, private Personen oder zur persönlichen Benutzung ausgerichtet.

Aktuell ist das System für kleinere Datenbestände ausgelegt. Performancetests bis ca. 100.000 Buchungen waren, je nach Serverperformance, erfolgreich. Das System hat keine spezifischen Performance-Optimierungen für große Datenmengen. 

# Features
* Verwaltung von Kasse und bis zu 6 Bankkonten
* Integrierter Login mit Nutzername + Passwort
* Kategorisierung von einzelnen Buchungen
* Intelligente Kategorieerkennung nach Eingabe von Buchungen
* Auto-Kategorie-Erkennung beim CSV-Import mit Schlüsselwörtern
* Speichern von Bemerkungen und beliebigen Dokumenten (PDF, JPG, ...) an Buchungen
* Import-Konfigurator für CSV-Import von Bankdaten
* Statistik-Auswertung für gesamten Zeitraum + Jahr
* Export pro Monat (Excel Format)
* 1-Klick Backup des gesamten Datenbestands
* Responsive-Design (Desktop + Mobile optimiert)
* Dark Mode mit Speicherung der Benutzereinstellung

# Screenshots
![](http://torsten-simon.de/pub/kassenbuch/list.JPG)
![](http://torsten-simon.de/pub/kassenbuch/accounts.JPG)
![](http://torsten-simon.de/pub/kassenbuch/booking.JPG)
![](http://torsten-simon.de/pub/kassenbuch/stats.JPG)
![](http://torsten-simon.de/pub/kassenbuch/categories.JPG)

# Frameworks
Das Projekt nutzt u.a. folgende Frameworks oder Toolkits

## Frontend
- Angular 21+ (Single Page Application)
- Angular Material (UI components & Material Design)
- SCSS (stylesheets with dark mode support)
- RxJS (reactive programming)

## Backend
- PHP 8.4
- Slim Framework 3.x (REST API)
- SQLite (database)
- PhpOffice PhpSpreadsheet (Excel export)
- Psalm (static analysis & type checking)

## Development
- Composer (PHP dependency management)
- npm (JavaScript dependency management)
- Docker & Docker Compose (containerization)
