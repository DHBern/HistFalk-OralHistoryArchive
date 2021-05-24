Omeka-API nutzen

# Omeka-API nutzen

Das vorliegende Dokument soll aufzeigen wie die API von Omeka konsumiert werden kann. Als Beispiel wird [corona-memory.ch](corona-memory.ch) dienen. Dazu werden bei allen generischen Pfadangaben die Entsprechungen für Corona-Memory in Klammern angegeben.

## Ressourcen

- offizielle [API-Reference](https://omeka.org/s/docs/developer/api/)
- offizielle [REST-API-Reference](https://omeka.org/s/docs/developer/api/rest_api/)

## Grundlegendes

### Endpunkt

Die API hat den Endpunkt _root_/api (https://www.corona-memory.ch/api).

### Resources

Folgende Ressourcen bietet Omeka an:

| Resource | Beschreibung |
| ----------| ----------------- |
| users | Benutzer, die sich einloggen können. |
| vocabularies | RDF vocabularies, die in Omeka importiert wurden |
| resource_classes | RDF classes, die zu den vocabularies gehören |
| properties | RDF properties, die zu vocabularies gehören |
| **items** | **Item RDF resources, die elementaren Bauteile von Omeka** |
| media | Media RDF resources, die **items** zugeordnet sind |
| item_sets | Item set RDF resources, inclusive set of items |
| resource_templates | Templates that define how to describe RDF resources |
| sites | Omeka sites, **corona-memory.ch** ist eine davon. |
| site_pages | Seiten in sites |
| modules | Module (Zusatzfunktionen) (Nur Such- und Lesezugriff) |
| api_resources | alle API resources die auf dem Server verfügbar sind (Nur Such- und Lesezugriff) |


### Operationen

Folgende Operationen können praktisch auf allen resources durchgeführt werden:

| Operation | Beschreibung | REST Hinweis |
| ----------| ----------------- | --- |
| search    | Liste von Ressourcen suchen | `GET /api/:api_resource` - normale GET Anfragen direkt an die Ressource |
| read 	    | Eine einzelne Ressource aufrufen | `GET /api/:api_resource/:id` - Die Ressourcen-ID wird direkt im Pfad eingegeben und nicht als Query-Parameter |
| create    | Eine neue Ressource erstellen | `POST /api/:api_resource` - Eine POST Anfrage direkt an die Ressource. ([Infos zum File-Upload](https://omeka.org/s/docs/developer/api/rest_api/#upload-files)) |
| update    | Eine Ressource verändern | `PUT /api/:api_resource/:id` / `PATCH /api/:api_resource/:id` - PUT oder PATCH Anfragen an die spezifische Ressource (siehe _read_) PUT überschreibt das Item, Patch updated |
| delete    | Ein item löschen | `DELETE /api/:api_resource/:id` - DELETE Anfrage an das Item |


### Parameter

Die folgende Tabelle zeigt nur die wichtigsten Parameter, die in der Query mitgegeben werden können. Alle weiteren Parameter finden sich in [den Docs](https://omeka.org/s/docs/developer/api/api_reference/).

| Parameter   | Description                                                                                                               | Type                   | Default                                                                                                |
| ----------- | ------------------------------------------------------------------------------------------------------------------------- | ---------------------- | ------------------------------------------------------------------------------------------------------ |
| id          | Limit matches to the given ID or IDs. Multiple IDs can be specified using the PHP array syntax (`id[]`). | integer or integer\[\] | none                                                                                                   |
| sort\_by    | Sort the result set by this field                                                                                         | string                 | created                                                                                                |
| sort\_order | Sort the result set in this order, ascending ("asc") or descending ("desc")                                               | string                 | desc                                                                                                   |
| page        | *The page number of the result set to return* **(Anfragen sind paginiert und liefern standardmässig nur einen Teil des Reusltats zurück. Dies kann mit _per\_page_ übersteuert werden.)**                                                                            | integer                | 1                                                                                                      |
| **per\_page**   | **The number of results per page**                                                                                            | integer                | uses [global "results per page" setting](https://omeka.org/s/docs/user-manual/admin/settings/#general) |
| limit       | The number of results to return                                                                                           | integer                | 0 (all)                                                                                                |
| offset      | The number offset of results to return                                                                                    | integer                | 0 (no offset)                                                                                          |

#### Parameter für _items_

In der [Dokumentation](https://omeka.org/s/docs/developer/api/api_reference/#parameters-for-items) sind die Parameter etwas verstreut. der _items_-Endpoint hat weitere wichtige Parameter:

`item_set_id`, `site_id` und `site_attachments_only`. Die ersten zwei Parameter akzeptieren Ganzzahlen oder Arrays ([]) von Ganzzahlen. Man kann also auch mehrere ids angeben. Der dritte Parameter akzeptiert _true_ und _false_.
Weitere Einschränkungen sind bei Items nicht möglich. Es müssen also immer alle items eines Sets oder einer Site abgefragt werden, wenn man die exakte ID nicht kennt.

#### Parameter für _media_

Analog zu _items_ gibt es spezielle Parameter für _media_:

| Parameter   | Description                                                    | Type    |
| ----------- | -------------------------------------------------------------- | ------- |
| item\_id    | Get media assigned to this item                                | integer |
| media\_type | Get media of this media type **(hier kann Beispielsweise _image/jpeg_ gesetzt werden, um nur JPG-Bilder als Ergebnis zu erhalten** ) | string  |
| site\_id    | Get media in this site's item pool AND are attached to a block | integer |
| ingester    | Get media using this ingester (added in 3.0.0)                 | string  |
| renderer    | Get media using this renderer (added in 3.0.0)                 | string  |

## Anwendungsbeispiele

### Weiterverwenden von Daten auf der Website

Die [Visualisierungen auf corona-memory.ch](https://www.corona-memory.ch/s/corona-memory/page/visualizations) greifen auf die API des Servers zu. Folgende GET-Abfrage liefert die erforderlichen Daten zu den Items für die _Gesamtbeiträge_:

https://www.corona-memory.ch/api/items?per_page=999999&item_set_id=796

Es wird also der Endpunkt _api/items_ mit den Parametern _per_page_ und _item_set_id_ abgefragt.
Der Parameter _per_page_ gibt an, wieviele Ergebnisse pro Anfrage maximal zurückgegeben werden sollen. Das Resultat ist also standardmässig paginiert. Diese Paginierung kann aufgehoben werden, indem man bei _per_page_ einen extrem hohen Wert setzt. Dies ist immer dann nützlich, wenn man mit dem kompletten Resultat arbeiten will.


Als Antwort schickt der Server ein JSON mit allen items.
Diese Informationen, bzw. Teile davon, werden dann verwendet um die Grafiken zu erstellen. Bspw. werden alle Inhalte von _dcterms:abstract_ und _o:title_ als Input für eine Wörterwolke verwendet.

### Verwendung der API als Datenquelle für eine Excel-Liste

Um die Items von Omeka als Datenquelle in einer Excelliste (365) zu verwenden, öffnet man eine neue Datei, wählt den Reiter _Daten_ und klickt dann auf den Button _Aus dem Web_:

![Screenshot, Daten einfügen](../_resources/9e97b229d0d248069569e0b0ff8e41b5.png)

Danach gibt man die API-Abfrage einfach als URL ein. In unserem Beispiel https://www.corona-memory.ch/api/items?per_page=999999&item_set_id=796.

![Screenshot, URL einfügen](../_resources/ee7878e08cef495887a9d3d386350ca9.png)

Nach dem bestätigen öffnet sich ein neues Fenster. In diesem Fenster konvertiert man zuerst die JSON-Antwort in eine Tabelle mit einem Klick auf _Zu Tabelle_:

![Screenshot, konvertieren](../_resources/c50edc84e37b49b9b3d72694ade5f8c1.png)

Beim folgenden Fenster behält man die Standardoptionen (Trennzeichen: keine, Behandlung zusätzlicher Spalten: Als Fehler anzeigen) und bestätigt mit OK. Danach sieht man eine Spalte, welche mit Column1 beschrieben ist und daneben ein Symbol mit zwei Pfeilen. Darauf klickt man und es öffnet sich ein Dropdown mit allen Daten aus der Abfrage:

![Screenshot, Dropdown](../_resources/e076ea5c9ee14a4eb793267c235c6c9b.png)

Dort wählt man die relevanten Daten und bestätigt. Die Liste ist nun erweitert. Bei verschachtelten Daten (das sind die meisten, muss einfach der letzte Schritt wiederholt werden)

![Screenshot, fertige Liste](../_resources/79a9136f5c1643688ea5c1a65f255403.png)

Wenn man alle relevanten Daten ausgewählt hat, bestätigt man mit _Schliessen & laden_:

![Screenshot, schliessen](../_resources/cdde10eb983644c69cd21915bf513da6.png)

-----------------------------------------------------------------------

Damit hat man Daten direkt von Omeka in eine Excelliste importiert. Diese Daten können auch laufend aktualisiert werden. Weitere Infos dazu auf der [offiziellen Microsoft Supportseite](https://support.microsoft.com/de-de/office/einf%C3%BChrung-in-den-abfrage-editor-power-query-1d6cdb63-bf70-4ae8-a7d5-6ae9547004d9).