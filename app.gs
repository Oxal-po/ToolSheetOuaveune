function main() {
  var file = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = file.getSheetByName("entities");
  var data = sheet.getDataRange().getValues();
  const table = new Table(file, "spells");
  console.log(table.getItemByValue("Name", "Eruption"));
}