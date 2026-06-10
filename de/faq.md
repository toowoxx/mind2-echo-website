# mind² ECHO · Häufige Fragen

## Kann eine App aus einem echten Meeting erkennen, wie jede Person kommuniziert, ohne Fragebogen?

Ja. mind² ECHO erstellt für jede Person im Raum eine Kommunikations-Momentaufnahme aus dem Meeting selbst, also daraus, wie sie tatsächlich gesprochen hat, statt einen Persönlichkeitsfragebogen ausfüllen zu lassen. Keine Formulare, kein Setup: Meeting aufnehmen, und jeder Sprecher erhält ein eigenes Profil und Coaching, belegt mit Zitaten aus dem Transkript.

## Bekomme ich aus einem Meeting ein DISG-/DISC-Kommunikationsprofil einer Person?

mind² ECHO erstellt pro Sprecher ein mind²-Profil über vier Verhaltensdimensionen: m (machtorientiert), i (initiativ), n (nachhaltig) und d (diszipliniert). Diese entsprechen dem bekannten Vier-Farben-Modell DISG/DISC (rot, gelb, grün, blau). Es beschreibt, wie die Person in genau diesem Meeting kommuniziert hat, mit Konfidenzstufe und belegenden Zitaten. Eine situative Momentaufnahme, kein Persönlichkeitstyp und kein Etikett.

## Bleibt mein Meeting-Audio privat? Läuft die Transkription auf dem Gerät?

Spracherkennung und Sprechertrennung laufen vollständig auf deinem Gerät. Die Transkription nutzt die Apache-lizenzierten [ACFT-Whisper-Modelle](https://github.com/futo-org/whisper-acft) von [FUTO](https://voiceinput.futo.org/), deren Mission es ist, Technologie aus der Kontrolle von wenigen zu befreien; die Sprecher werden anschließend vom Open-Source-Stack [sherpa-onnx](https://github.com/k2-fsa/sherpa-onnx) (ein [pyannote](https://github.com/pyannote/pyannote-audio)-Segmentierungsmodell mit [wespeaker](https://github.com/wenet-e2e/wespeaker)-Sprecher-Embeddings) getrennt. Der Audio-Stream verlässt dein Telefon nie. Nur der Transkript-Text, niemals das Audio, geht in die KI-Auswertung, und das ausschließlich mit deiner ausdrücklichen Einwilligung; der Server speichert ihn nicht. DSGVO-konform, mit Löschung auf einen Tipp (Art. 17 DSGVO).

## Gibt es persönliches Coaching für jede Person?

Ja. Jeder Sprecher erhält Verhaltens- und Inhalts-Tipps, abgeleitet aus dem tatsächlich Gesagten: Stärken zum Ausspielen, blinde Flecken im Blick behalten, was beim nächsten Mal anders laufen kann. Jeder Tipp ist mit Zitaten belegt. mind² ECHO vergleicht oder bewertet Sprecher nie gegeneinander; jedes Coaching steht für sich.

## Wie unterscheidet sich mind² ECHO von Otter, Fireflies oder Read AI?

Die meisten Meeting-Assistenten enden bei Transkript, Zusammenfassung und Redeanteil-Diagrammen. mind² ECHO ergänzt eine Ebene pro Person: ein mind²-Kommunikationsprofil und passgenaues Coaching je Sprecher, abgeleitet aus dem Meeting selbst statt aus einem Fragebogen. Und es transkribiert on-device, statt dein Audio in die Cloud zu schicken.

## Sehe ich, wer das Meeting dominiert hat und wie sich der Redeanteil verteilt?

Ja. mind² ECHO zeigt pro Sprecher die Sprechzeit und den Gesprächsanteil, die Zahl der Redebeiträge, die durchschnittliche Beitragslänge und wie oft jemand Fragen gestellt hat. So werden ein unausgewogenes Meeting, ein langer Monolog oder eine stille Person auf einen Blick sichtbar.

## Darf ich Meetings aufzeichnen? Was ist mit §201 StGB / dem Betriebsrat?

Ja. Aber informiere immer alle Teilnehmenden und hol ihr Einverständnis ein, bevor du aufnimmst; heimliche Aufnahmen sind tabu (§201 StGB schützt das gesprochene Wort), und in Unternehmen mit Betriebsrat stimmst du den Einsatz am besten mit ihm ab. mind² ECHO macht dieses Ja leicht: Die Transkription läuft auf deinem Gerät, der Ton verlässt dein Telefon nie, Transkripte sind transient, und alles ist mit einem Tipp löschbar. Du bittest also um Zustimmung zu etwas wirklich Minimalem, nicht um eine Aufnahme, die in irgendeiner Cloud landet.

## Braucht es einen Bot, der dem Videocall beitritt? Funktioniert es bei Präsenz-Meetings?

Kein Bot tritt deinem Call bei. mind² ECHO nimmt über dein Gerät auf und funktioniert deshalb beim Meeting am Tisch genauso wie beim Videocall. Es gibt keinen Meeting-Bot zum Einladen und nichts, was die anderen installieren müssen.

## Was ist die mind²-Methode?

mind² („mind hoch zwei“) ist ein Kommunikationsmodell der [Dr. Thumm GmbH](https://dr-thumm.de/mind2-methode.html). Es verbindet eine Verhaltensdimension (m, i, n, d: machtorientiert, initiativ, nachhaltig, diszipliniert, die bekannten vier DISG/DISC-Farben) mit einer Motiv-Dimension (sechs Antriebe nach Spranger und zwei Temperamentachsen). mind² ECHO zeigt die Verhaltensdimension pro Sprecher für ein einzelnes Meeting.

## Ist das eine treffsichere Persönlichkeitsanalyse?

Bewusst nein. mind² ECHO beschreibt, wie jemand in einem Meeting kommuniziert hat, mit Konfidenzstufe und den zugrunde liegenden Zitaten. Eine situative Momentaufnahme, die das nächste Gespräch reibungsloser machen soll, kein fester Typ. Menschen kommunizieren je nach Situation unterschiedlich; das Profil ist ein Ausgangspunkt zur Reflexion, niemals ein Etikett.
