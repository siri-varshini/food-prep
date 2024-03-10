const apiUrl = `https://api.spoonacular.com/recipes/findByIngredients`;
const apiKey = `{YOUR_API_KEY from spoonacular.com}`;

const searchInput = document.getElementById("searchInput");
const submit = document.getElementById("submit");
const recipeContainer = document.getElementById("recipeContainer");

submit.addEventListener("click", async () => {
  recipeContainer.innerHTML = "";
  const img = document.createElement("img");
  img.src = "images/loadingGif.gif";
  img.setAttribute("style", "width:30vw;margin-left:35vw;");
  recipeContainer.appendChild(img);
  const finalUrl = `${apiUrl}?ingredients=${searchInput.value}&number=100&apiKey=${apiKey}`;
  let res = await fetch(finalUrl);
  recipeContainer.innerHTML = "";
  if (res.ok) {
    let recipes = await res.json();
    if (recipes.length === 0) {
      const div = document.createElement("div");
      const img = document.createElement("img");
      img.src = "images/notfound.jpg";
      img.setAttribute("style", "max-height:30vh;");
      div.appendChild(img);
      const h4 = document.createElement("h4");
      h4.textContent =
        "OOPS!!! No Recipes Found, Which uses the given ingredients.....";
      div.appendChild(h4);
      div.setAttribute(
        "style",
        "display:flex;flex-direction:column;justify-content:center;align-items:center;"
      );
      recipeContainer.appendChild(div);
      recipeContainer.setAttribute("style", "margin-left:30vw");
      return;
    }
    let ind = 0;
    recipeContainer.setAttribute("style", "margin-left:1rem;");
    for (let recipe of recipes) {
      const div = document.createElement("div");
      const img = document.createElement("img");
      const h3 = document.createElement("h3");
      const btn = document.createElement("button");
      img.src = recipe.image;
      div.appendChild(img);
      h3.textContent = recipe.title;
      div.appendChild(h3);
      btn.setAttribute("id", `${recipe.id}`);
      btn.setAttribute("class", `expand`);
      btn.textContent = "expand";
      div.appendChild(btn);
      div.setAttribute(
        "style",
        "background-color:grey;display:flex;flex-direction:column;justify-content:center;align-items:center;padding:1rem;border-radius:3px;"
      );

      recipeContainer.appendChild(div);
      ind++;
    }
    document.querySelectorAll(".expand").forEach((button) => {
      button.addEventListener("click", async function () {
        let recipeUrl = `https://api.spoonacular.com/recipes/${this.id}/information?includeNutrition=false&apiKey=${apiKey}`;
        let res = await fetch(recipeUrl);
        let recipeInfo = await res.json();
        window.open(recipeInfo.spoonacularSourceUrl, "_blank");
      });
    });
  } else {
    const div = document.createElement("div");
    const img = document.createElement("img");
    img.src = "images/error.jpg";
    img.setAttribute("style", "max-height:30vh;");
    div.appendChild(img);
    const h4 = document.createElement("h4");
    h4.textContent = "OOPS!!! ERROR, fetching data from the server.....";
    div.appendChild(h4);
    div.setAttribute(
      "style",
      "display:flex;flex-direction:column;justify-content:center;align-items:center;"
    );
    recipeContainer.appendChild(div);
    recipeContainer.setAttribute("style", "margin-left:30vw");
  }
});
