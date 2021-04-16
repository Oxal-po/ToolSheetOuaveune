function getRef(file, name) {
  const sheets = file.getSheets();
  for (let i = 0; i < sheets.length; i++) {
    const obj = splitId(name);
    let nameCol = sheets[i].getName();
    if (isPlurial(sheets[i].getName())) {
      nameCol = toSingle(sheets[i].getName());
    }

    const regexFile = new RegExp("^" + nameCol, "gi");

    const tableName = regexFile.exec(name);
    if (tableName) {
      return {
        tableName: toPlurial(tableName[0]),
        columnName: replaceFirst(obj.name, tableName[0], "")
      }
    }
  }
}