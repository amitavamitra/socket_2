### socket_2 is a collaborative app which would allow create materials  and BOM's in different rooms of the app. While user(s) create material(s) in one room , they emit to the users in the same room as well as  broadasting key information about materials to the BOM room. This feature allows user(s) in the BOM room to keep adding components to the BOM.
### Finally when all parties agree , we get material_json and bom_json , which are set up as artifact in s3 bucket and a SAP AI core CRUD pipeline is triggered.
### This pipeline creates the materials and then the BOM in an S4 system.

### Clearly the intention is not to limit oneself with material or BOM only , but this MVP would inspire and educate us to learn about further steps that can be collaborated upon and made better. The key principle is collaborative proccess and organisations are much more adaptable and less fragile to shocks. 
