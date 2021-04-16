/**
 * classe créé pour simplifier l'utilisation d'un tableau sheet, basé sur la structure suivante
 * 
 * ligne 1 définition des attributs
 * ligne 2 à n les objets
 */
class Table {

  constructor(file, name) {
    this.file = file;
    this.name = name;
    this.data = file.getSheetByName(name).getDataRange().getValues();
  }

  /**
   * renvois tout les attributs que peux avoir l'objet
   */
  get indexName() {
    return this.data[0];
  }

  getItemByValue(colName, value) {
    let colIndex = 0;
    let index = 0;
    for (let i = 0; i < this.indexName.length; i++) {
      if (colName == this.indexName[i]) {
        colIndex = i;
        break;
      }
    }
    for (let i = 0; i < this.data.length - 1; i++) {
      if (value == this.data[i + 1][colIndex]) {
        index = i;
        break;
      }
    }
    return this.getItem(index);
  }


  /**
   * renvois un objets basé sur les attribut et ses valeur
   */
  getItem(index) {
    let item = {};

    // todo faire en sorte de prendre en compte les reférences
    for (let i = 0; i < this.indexName.length; i++) {
      if (this.data[index + 1][i] && this.data[index + 1][i] != "") {
        let name = this.indexName[i].split(" ").join("");
        let ref = getRef(this.file, name);
        if (ref && ref.tableName != this.name) {
          const t = new Table(this.file, ref.tableName);
          if (item[ref.tableName]) {
            item[ref.tableName].push(t.getItemByValue(ref.columnName, this.data[index + 1][i]));
          } else {
            item[ref.tableName] = [t.getItemByValue(ref.columnName, this.data[index + 1][i])];
          }
        } else {
          item[name] = this.data[index + 1][i];
        }
      }
    }
    return item;
  }
}