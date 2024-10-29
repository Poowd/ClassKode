export default function useValidation() {
  function ValiAI(type, data) {
    switch (type) {
      case "SCHLID":
        if (/^[0-9]{11}/g.test(data) && data.length == 11) {
          return ["is-valid", "valid-feedback", "Looks Good!"];
        }
        return ["is-invalid", "invalid-feedback", "Looks Bad!"];
      case "Code":
        if (/^[A-Z]{3,6}-[0-9]{3}/g.test(data) && data.length <= 10) {
          return ["is-valid", "valid-feedback", "Looks Good!"];
        }
        return ["is-invalid", "invalid-feedback", "Looks Bad!"];
      case "Name":
        if (/^[A-Z]{1}[a-z\s]{2,99}/gi.test(data) && data.length <= 100) {
          return ["is-valid", "valid-feedback", "Looks Good!"];
        }
        return ["is-invalid", "invalid-feedback", "Looks Bad!"];
      case "SectionName":
        if (/^[A-Z]{2,5}[0-9]{3}/gi.test(data) && data.length <= 8) {
          return ["is-valid", "valid-feedback", "Looks Good!"];
        }
        return ["is-invalid", "invalid-feedback", "Looks Bad!"];
      case "RoomName":
        if (/^[A-Z0-9]{3,50}/gi.test(data) && data.length <= 50) {
          return ["is-valid", "valid-feedback", "Looks Good!"];
        }
        return ["is-invalid", "invalid-feedback", "Looks Bad!"];
      case "Abbrev":
        if (/[A-Z]{2,10}/g.test(data) && data.length <= 10) {
          return ["is-valid", "valid-feedback", "Looks Good!"];
        }
        return ["is-invalid", "invalid-feedback", "Looks Bad!"];
      case "Initial":
        if (/[A-Z]{0,2}/g.test(data) && data.length <= 2) {
          return ["is-valid", "valid-feedback", "Looks Good!"];
        }
        return ["is-invalid", "invalid-feedback", "Looks Bad!"];
      case "Phone":
        if (/[0-9]{11}/g.test(data) && data.length == 11) {
          return ["is-valid", "valid-feedback", "Looks Good!"];
        }
        return ["is-invalid", "invalid-feedback", "Looks Bad!"];
      case "SchoolEmail":
        if (data.includes("@munoz.sti.edu") && data.length <= 50) {
          return ["is-valid", "valid-feedback", "Looks Good!"];
        }
        return ["is-invalid", "invalid-feedback", "Looks Bad!"];
      case "Numerical":
        if (/^[0-9{1,2}]/g.test(data) && data.length <= 2 && data <= 50) {
          return ["is-valid", "valid-feedback", "Looks Good!"];
        }
        return ["is-invalid", "invalid-feedback", "Looks Bad!"];
      default:
        break;
    }
  }

  function ValiAIBool(type, data) {
    switch (type) {
      case "SCHLID":
        if (/^[0-9]{11}/g.test(data) && data.length == 11) {
          return true;
        }
        return false;
      case "Code":
        if (/^[A-Z]{3,6}-[0-9]{3}/g.test(data) && data.length <= 10) {
          return true;
        }
        return false;
      case "Name":
        if (/^[A-Z]{1}[a-z\s]{2,99}/gi.test(data) && data.length <= 100) {
          return true;
        }
        return false;
      case "SectionName":
        if (/^[A-Z]{2,5}[0-9]{3}/gi.test(data) && data.length <= 8) {
          return true;
        }
        return false;
      case "RoomName":
        if (/^[A-Z0-9]{3,50}/gi.test(data) && data.length <= 50) {
          return true;
        }
        return false;
      case "Abbrev":
        if (/[A-Z]{2,10}/g.test(data) && data.length <= 10) {
          return true;
        }
        return false;
      case "Initial":
        if (/[A-Z]{0,2}/g.test(data) && data.length <= 2) {
          return true;
        }
        return false;
      case "Phone":
        if (/[0-9]{11}/g.test(data) && data.length == 11) {
          return true;
        }
        return false;
      case "SchoolEmail":
        if (data.includes("@munoz.sti.edu") && data.length <= 50) {
          return true;
        }
        return false;
      case "Numerical":
        if (/^[0-9{1,2}]/g.test(data) && data.length <= 2 && data <= 50) {
          return true;
        }
        return false;
      default:
        break;
    }
  }

  return [ValiAI, ValiAIBool];
}
