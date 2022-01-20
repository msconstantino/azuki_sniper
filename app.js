import fs from "fs";
import fetch from "node-fetch";
import csv from "csv-writer";
globalThis.fetch = fetch;

const createCsvWriter = csv.createObjectCsvWriter;

const csvWriter = createCsvWriter({
  path: "out.csv",
  header: [
    { id: "name", title: "Name" },
    { id: "description", title: "Description" },
    { id: "image", title: "Image" },
    { id: "dna", title: "DNA" },
    { id: "edition", title: "edition" },
    { id: "date", title: "Date" },
    { id: "artist", title: "Artist" },
    { id: "type", title: "Type" },
    { id: "accessories", title: "Accessories" },
    { id: "manufacturer", title: "Manufacturer" },
    { id: "compiler", title: "Compiler" },
    { id: "developer", title: "Developer" },
  ],
});

function snipe(number) {
  fetch(`https://mint.etherminators.com/metadata/${number}`)
    .then((response) => response.json())
    .then((data) => {
      data.type = data.attributes.map((i) => {
        if (i.trait_type == "Type") {
          return i.value;
        }
        else {
          return
        }
      }).join("");
      
      data.accessories = data.attributes.filter(i => i.trait_type == 'Accessory').map((i) => {return i.value}).join(", ");
      csvWriter
        .writeRecords([data])
        .then(() => console.log("The CSV file was written successfully"));

    });
}

for (var i = 0; i < 3200; i++) {
  snipe(i)
}