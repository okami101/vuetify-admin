var objectToFormData = function(obj, form, namespace) {
  var fd = form || new FormData();
  var formKey;

  for (var property in obj) {
    if (obj.hasOwnProperty(property)) {
      if (namespace) {
        formKey = namespace + "[" + property + "]";
      } else {
        formKey = property;
      }

      // if the property is an object, but not a File,
      // use recursivity.
      if (
        typeof obj[property] === "object" &&
        !(obj[property] instanceof File)
      ) {
        objectToFormData(obj[property], fd, property);
        continue;
      }

      // if it's a boolean
      if (typeof obj[property] === "boolean") {
        fd.append(formKey, obj[property] ? "1" : "0");
        continue;
      }

      // if it's a string or a File object
      fd.append(formKey, obj[property]);
    }
  }

  return fd;
};

export default objectToFormData;
