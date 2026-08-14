# mind² ECHO · Häufige Fragen

## Kann eine App aus einem echten Meeting erkennen, wie jede Person kommuniziert, ohne Fragebogen?

Ja. mind² ECHO erstellt für jede Person im Raum eine Kommunikations-Momentaufnahme aus dem Meeting selbst, also daraus, wie sie tatsächlich gesprochen hat, statt einen Persönlichkeitsfragebogen ausfüllen zu lassen. Keine Formulare, kein Setup: Meeting aufnehmen, und jeder Sprecher erhält ein eigenes Profil und Coaching, belegt mit Zitaten aus dem Transkript.

## Bekomme ich aus einem Meeting ein DISG-/DISC-Kommunikationsprofil einer Person?

mind² ECHO erstellt pro Sprecher ein mind²-Profil über vier Verhaltensdimensionen: m (machtorientiert), i (initiativ), n (nachhaltig) und d (diszipliniert). Diese entsprechen dem bekannten Vier-Farben-Modell DISG/DISC (rot, gelb, grün, blau). Es beschreibt, wie die Person in genau diesem Meeting kommuniziert hat, mit Konfidenzstufe und belegenden Zitaten. Eine situative Momentaufnahme, kein Persönlichkeitstyp und kein Etikett.

## Bleibt mein Meeting-Audio privat? Läuft die Transkription auf dem Gerät?

Spracherkennung und Sprechertrennung laufen vollständig auf deinem Gerät. Die Transkription übernimmt NVIDIAs [Nemotron-Streaming-Sprachmodell](https://huggingface.co/nvidia/nemotron-3.5-asr-streaming-0.6b) über den Open-Source-Stack [sherpa-onnx](https://github.com/k2-fsa/sherpa-onnx), und zwar live: Die Wörter erscheinen im Transkript, während noch gesprochen wird. Die Sprecher werden in zwei Stufen getrennt, beide auf dem Gerät: live während der Aufnahme durch ein [pyannote](https://github.com/pyannote/pyannote-audio)-Segmentierungsmodell mit [wespeaker](https://github.com/wenet-e2e/wespeaker)-Sprecher-Embeddings, und noch einmal in der abschließenden Analyse durch NVIDIAs Diarisierungsmodell [Streaming Sortformer](https://huggingface.co/nvidia/diar_streaming_sortformer_4spk-v2.1), das jedes Wort dem richtigen Sprecher zuordnet. Die Apache-lizenzierten [ACFT-Whisper-Modelle](https://github.com/futo-org/whisper-acft) von [FUTO](https://voiceinput.futo.org/), deren Mission es ist, Technologie aus der Kontrolle von wenigen zu befreien, bleiben als Fallback an Bord. Der Audio-Stream verlässt dein Gerät nie. Nur der Transkript-Text, niemals das Audio, geht in die KI-Auswertung, und das ausschließlich mit deiner ausdrücklichen Einwilligung; der Server speichert ihn nicht. DSGVO-konform, mit Löschung auf einen Tipp (Art. 17 DSGVO).

## Gibt es persönliches Coaching für jede Person?

Ja. Jeder Sprecher erhält Verhaltens- und Inhalts-Tipps, abgeleitet aus dem tatsächlich Gesagten: Stärken zum Ausspielen, blinde Flecken im Blick behalten, was beim nächsten Mal anders laufen kann. Jeder Tipp ist mit Zitaten belegt. mind² ECHO vergleicht oder bewertet Sprecher nie gegeneinander; jedes Coaching steht für sich.

## Wie unterscheidet sich mind² ECHO von Otter, Fireflies oder Read AI?

Die meisten Meeting-Assistenten enden bei Transkript, Zusammenfassung und Redeanteil-Diagrammen. mind² ECHO ergänzt eine Ebene pro Person: ein mind²-Kommunikationsprofil und passgenaues Coaching je Sprecher, abgeleitet aus dem Meeting selbst statt aus einem Fragebogen. Und es transkribiert on-device, statt dein Audio in die Cloud zu schicken.

## Sehe ich, wer das Meeting dominiert hat und wie sich der Redeanteil verteilt?

Ja. mind² ECHO zeigt pro Sprecher die Sprechzeit und den Gesprächsanteil, die Zahl der Redebeiträge, die durchschnittliche Beitragslänge und wie oft jemand Fragen gestellt hat. So werden ein unausgewogenes Meeting, ein langer Monolog oder eine stille Person auf einen Blick sichtbar.

## Wie viele Sprecher kann die App auseinanderhalten?

Bis zu vier Sprecher pro Meeting, das ist die Grenze des Diarisierungsmodells. Innerhalb dieser Grenze ist die Zuordnung präzise: In der abschließenden Analyse ordnet NVIDIAs [Streaming Sortformer](https://huggingface.co/nvidia/diar_streaming_sortformer_4spk-v2.1) jedes Wort einem Sprecher zu und kommt auch mit Unterbrechungen und kurzen Einwürfen zurecht; ein schnelles „Ja“ mitten im Satz einer anderen Person landet beim richtigen Sprecher, ohne deren Satz zu zerreißen. Überprüft wurde das durch Abhören der Aufnahme eines echten Meetings.

## Darf ich Meetings aufzeichnen? Was ist mit §201 StGB / dem Betriebsrat?

Ja. Aber informiere immer alle Teilnehmenden und hol ihr Einverständnis ein, bevor du aufnimmst; heimliche Aufnahmen sind tabu (§201 StGB schützt das gesprochene Wort), und in Unternehmen mit Betriebsrat stimmst du den Einsatz am besten mit ihm ab. mind² ECHO macht dieses Ja leicht: Die Transkription läuft auf deinem Gerät, der Ton verlässt dein Gerät nie, Transkripte sind transient, und alles ist mit einem Tipp löschbar. Du bittest also um Zustimmung zu etwas wirklich Minimalem, nicht um eine Aufnahme, die in irgendeiner Cloud landet.

## Braucht es einen Bot, der dem Videocall beitritt? Funktioniert es bei Präsenz-Meetings?

Kein Bot tritt deinem Call bei. mind² ECHO nimmt über dein Gerät auf und funktioniert deshalb beim Meeting am Tisch genauso wie beim Videocall. Es gibt keinen Meeting-Bot zum Einladen und nichts, was die anderen installieren müssen.

## Warum lädt die App Modelle herunter, und wie groß sind sie?

Die Sprachmodelle sind zu groß, um sie fest in die App einzubauen; mind² ECHO lädt sie deshalb bei Bedarf herunter: das Transkriptionsmodell mit rund 410 MB, das Diarisierungsmodell für die abschließende Analyse mit 492 MB, dazu die zwei kleinen Modelle für die Live-Sprechertrennung mit zusammen rund 36 MB. Die beiden großen Modelle werden gegen eine SHA-256-Prüfsumme verifiziert und kommen von GitHub-Releases unter unserer Kontrolle; die zwei kleinen Live-Modelle stammen aus den Releases des Open-Source-Projekts sherpa-onnx. Beim Laden eines Modells werden nie Server eines KI-Anbieters kontaktiert. Vor dem Start prüft die App den freien Speicherplatz, und im Mobilfunknetz fragt sie nach, bevor sie etwas Großes herunterlädt.

## Kann ich vorhandene Aufnahmen importieren?

Ja. Vorhandene Audiodateien, etwa FLAC- oder WAV-Aufnahmen, lassen sich importieren und durchlaufen dieselbe On-Device-Pipeline wie ein Live-Meeting: Das Transkript erscheint live, während der Import läuft, und der Import läuft schneller als in Echtzeit, eine lange Aufnahme ist also in kürzerer Zeit verarbeitet, als sie gedauert hat. Alles Weitere, Sprechertrennung, Profile und Coaching, funktioniert genauso wie bei einem in der App aufgenommenen Meeting.

## Was ist die mind²-Methode?

mind² („mind hoch zwei“) ist ein Kommunikationsmodell der [Dr. Thumm GmbH](https://dr-thumm.de/mind2-methode.html). Es verbindet eine Verhaltensdimension (m, i, n, d: machtorientiert, initiativ, nachhaltig, diszipliniert, die bekannten vier DISG/DISC-Farben) mit einer Motiv-Dimension (sechs Antriebe nach Spranger und zwei Temperamentachsen). mind² ECHO zeigt die Verhaltensdimension pro Sprecher für ein einzelnes Meeting.

## Ist das eine treffsichere Persönlichkeitsanalyse?

Bewusst nein. mind² ECHO beschreibt, wie jemand in einem Meeting kommuniziert hat, mit Konfidenzstufe und den zugrunde liegenden Zitaten. Eine situative Momentaufnahme, die das nächste Gespräch reibungsloser machen soll, kein fester Typ. Menschen kommunizieren je nach Situation unterschiedlich; das Profil ist ein Ausgangspunkt zur Reflexion, niemals ein Etikett.
