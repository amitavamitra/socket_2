# socket_2 is a collaborative app which would allow create materials  and BOM's in different rooms of the app. While user(s) create material(s) in one room , they emit to the users in the same room as well as  broadasting key information about materials to the BOM room. This feature allows user(s) in the BOM room to keep adding components to the BOM.
Finally when all parties agree , we get material_json and bom_json , which are set up as artifact in s3 bucket and a SAP AI core training pipeline is triggered.
This pipeline creates the materials and then the BOM in an S4 system.
