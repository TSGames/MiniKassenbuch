# MiniKassenbuch
<p align="center">
  <img style="background-color:black" src="http://torsten-simon.de/pub/kassenbuch/badge.png">
</p>
<p>
A simple PHP and Javascript application to manage accounting (for german law)

Eine simple PHP &amp; Javascript Applikation zum führen einfacher Kassenbücher &amp; Vereinskassen
</p>

# Ziel
Ziel soll es sein, eine offene, kostenfreie Plattform für die Verwaltung von Kassenbeständen oder Konten durchzuführen. Einfache Statistiken sollen bei der Auswertung helfen.

Das System ist insbesondere an Vereine, private Personen oder zur persönlichen Benutzung ausgerichtet.

Aktuell ist das System für kleinere Datenbestände ausgelegt. Performancetests bis ca. 100.000 Buchungen waren, je nach Serverperformance, erfolgreich. Das System hat keine spezifischen Performance-Optimierungen für große Datenmengen. 

# Features
* Verwaltung von Kasse und bis zu 6 Bankkonten
* Integrierter Login mit Nutzername + Passwort
* Kategorisierung von einzelnen Buchungen
* Intelligente Kategorieerkennung nach Eingabe von Buchungen
* Speichern von Bemerkungen und beliebigen Dokumenten (PDF, JPG, ...) an Buchungen
* Import-Konfigurator für CSV-Import von Bankdaten
* Statistik-Auswertung für gesamten Zeitraum + Jahr
* Export pro Monat
* 1-Klick Backup des gesamten Datenbestands
* Responsive-Design (Desktop + Mobile optimiert)

# Installation
Das System muss mittels 
```sh
./update-composer.sh
php composer.phar install
```
konfiguriert werden.

Alternativ können Binaries ([hier](https://github.com/TSGames/MiniKassenbuch/actions) bezogen werden. Ein PHP 7.x Webserver mit Unterstützung für SQLite wird benötigt.

## Konfiguration unter Debian oder Ubuntu mit Apache

### Pakete installieren
```sh
apt install libapache2-mod-php php-sqlite3
```

### Webserver konfigurieren

Falls der Webserver nur diesen einen
[Virtual Host](https://httpd.apache.org/docs/2.4/de/vhosts/name-based.html)
zur Verfügung stellen soll, können die folgenden Zeilen in
`/etc/apache2/sites-enabled/000-default.conf` **anstelle** der bestehenden
`DocumentRoot`-Zeile eingetragen werden. (Wer mehrere Virtual Hosts nutzt,
sollte wissen, wie diese Zeilen in die bestehende Konfiguration zu integrieren
sind.)
```apache
	DocumentRoot /pfad/zum/MiniKassenbuch/public
	<Directory /pfad/zum/MiniKassenbuch/public/>
		Options Indexes FollowSymLinks
		AllowOverride All
	</Directory>
```
Natürlich muss `/pfad/zum/MiniKassenbuch` durch den Installationspfad auf
dem System ersetzt werden.

Dem Webserver muss Schreibzugriff auf das Verzeichnis gegeben werden, damit
die Datenbank (`storage.sqlite`) und die Dokumente (`documents/*`) angelegt
werden können:
```sh
chmod g+w /pfad/zum/MiniKassenbuch
chgrp www-data /pfad/zum/MiniKassenbuch
```

## Erster Login
Nach dem ersten Hochladen der Webanwendung und Aufruf der Seite muss ein Login-Screen inkl. einer Hinweis-Meldung, dass es sich um den ersten Login handelt, erscheinen. Sollte dieser Hinweis nicht erscheinen, auf jeden Fall die Zugangsdaten zurücksetzen (s. unten)!
Die nun erfolgende Eingabe wird für spätere Zugriffe als Login verwendet.

## Login zurücksetzen
Der Login ist (Passwort verschlüsselt) in der Datei `src/authentication.json` gespeichert. Diese kann auf dem Server gelöscht werden, der anschließend erfolgende Login wird wieder für zukünftige Zugriffe verwendet


# Screenshots
![](http://torsten-simon.de/pub/kassenbuch/list.JPG)
![](http://torsten-simon.de/pub/kassenbuch/accounts.JPG)
![](http://torsten-simon.de/pub/kassenbuch/booking.JPG)
![](http://torsten-simon.de/pub/kassenbuch/stats.JPG)
![](http://torsten-simon.de/pub/kassenbuch/categories.JPG)

# Frameworks
Das Projekt nutzt u.a. folgende Frameworks oder Toolkits
- composer
- slim
- twig
- materialize.css
- material icons
- jQuery
- Google Charts
