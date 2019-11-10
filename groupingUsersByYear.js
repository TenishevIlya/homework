let json = '[{"user_name":"jdeanesy0","first_name":"Joyan","last_name":"De Anesy","birth_date":"1999-06-27T08:49:07Z"},{"user_name":"lmincini1","first_name":"Lowe","last_name":"Mincini","birth_date":"1999-02-04T00:49:27Z"},{"user_name":"ahoult2","first_name":"Aggie","last_name":"Hoult","birth_date":"1999-05-10T04:12:57Z"},{"user_name":"uaxe3","first_name":"Upton","last_name":"Axe","birth_date":"1998-04-12T04:21:39Z"},{"user_name":"bmahaddie4","first_name":"Basilio","last_name":"Mahaddie","birth_date":"1997-02-11T08:23:53Z"},{"user_name":"mvalentetti5","first_name":"Maximo","last_name":"Valentetti","birth_date":"1997-02-10T19:23:16Z"}]';

let groupingUsersByYear = (json) => {
  let jsonParse = JSON.parse(json);
  let object = new Object();              
  let years = [];

  let unique_years = jsonParse.reduce((last,current) => {
    let current_date = new Date(current.birth_date);
      if (!years.includes(current_date.getFullYear())) {
        years.push(current_date.getFullYear());
        object[String(current_date.getFullYear())] = [];
      }
    return years;
  },0);

  let result = unique_years.reduce((start,now) => {
    let current_array = [];
      jsonParse.reduce((last,current) => { 
        let current_date = new Date(current.birth_date);
          if ((String(current_date.getFullYear()) in object) && (now === current_date.getFullYear())) {
            let full_name = current.first_name+current.last_name;
            current['name'] = full_name;
            current.birth_date = current_date;
            delete current.first_name;
            delete current.last_name;  
            current_array.push(current);
          }
      },0);
    object[String(now)] = current_array;
    return object;    
  },0);
  //return result;
  console.log(result);
}

groupingUsersByYear(json);