
/*
 * Takes a (formsy-react) form model
 * and returns a FormData object
 */
export function synthFormDataFromModel(model) {

  let f = new FormData();

  for (var attr in model) {
    if (model.hasOwnProperty(attr)) {

      var value = model[attr];

      switch (Object.prototype.toString.call(value)) {
        case '[object Array]':
          // iterate over arrays and append every item under the same key
          value.forEach( v => f.append(attr, v) );
          break;
        case '[object FileList]':
          // iterate over FileList and append all files
          [...value].map( file => f.append(attr, file) );
          break;
        default:
          // append field (default)
          f.append(attr, value);
      }
    }
  }
  return f;
}

