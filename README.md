# MiniKassenbuch
A simple PHP and Javascript application to manage accounting (for german law)

Eine simple PHP &amp; Javascript Applikation zum führen einfacher Kassenbücher &amp; Vereinskassen

# Ziel
Ziel soll es sein, eine offene, kostenfreie Plattform für die Verwaltung von Kassenbeständen oder Konten durchzuführen. Einfache Statistiken sollen bei der Auswertung helfen.

Das System ist insbesondere an Vereine ausgerichtet.

Aktuell ist das System für kleinere Datenbestände ausgelegt. Performancetests bis ca. 100.000 Buchungen waren, je nach Serverperformance, erfolgreich.

# Installation
Das System muss mittels 
```sh
./update-composer.sh
php composer.phar install
```
konfiguriert werden.

Alternativ können Binaries (Coming Soon) bezogen werden. Ein PHP 7.x Webserver wird benötigt.

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
		AuthType Basic
		AuthName "MiniKassenbuch"
		AuthUserFile "/pfad/zum/MiniKassenbuch/.htpasswd"
		<RequireAny>
			Require host localhost
			Require valid-user
		</RequireAny>
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

Damit nicht jeder weltweit auf das Kassenbuch zugreifen und auch verändern
kann, ist standardmässig nur der Zugriff vom Webserver selbst erlaubt
(`Require host localhost`). Alle anderen müssen sich mittels Passwort
authentifizieren (`Require valid-user`). Diese Nutzer müssen nun mittels
```sh
touch /pfad/zum/MiniKassenbuch/.htpasswd
htpasswd /pfad/zum/MiniKassenbuch/.htpasswd benutzer
```
eingetragen werden. Die erste Zeile ist nur vor dem Anlegen des ersten Nutzers
notwendig; mehrfache Anwendung ist aber unschädlich. Anstelle von `benutzer`
muss der jeweilige Name des Benutzers angegeben werden.


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
