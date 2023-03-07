$generateBtn = $("#get-cupcakes").get();
$updateForm = $("#update-form").get();
$updateBtn = $("#submit-update").get();
$createForm = $("#create-form").get();
$showCreateFormBtn = $("#show-create-form").get();
$createBtn = $("#submit-create").get();
$cupcakeList = $("#cupcake-list").get();
$cancelBtn = $(".cancel-btn").get();

$($generateBtn).click(getCupcakes);
$($showCreateFormBtn).click(showCreateForm);
$($createBtn).click(createCupcake);
$($cupcakeList).click(showAndFillUpdateForm);
$($updateBtn).click(updateCupcake);
$($cancelBtn).click(clearAndHideForm((id = ".forms")));
$($cupcakeList).click(deleteCupcake);

function clearAndHideForm(id) {
  $(id).attr("hidden", "hidden");
  $("input").val("");
}

async function getCupcakes() {
  const resp = await axios.get("/api/cupcakes");
  const cupcakes = resp["data"]["cupcakes"];

  for (let cupcake of cupcakes) {
    $("#cupcake-list").append(
      `<li class="m-1"><button class="delete btn btn-sm btn-outline-danger mr-1 p-1" data-id="${cupcake["id"]}">X</button><button class="update btn btn-sm btn-outline-info mr-1 p-1" data-id="${cupcake["id"]}">edit</button> ${cupcake["flavor"]}</li>`
    );
  }
}

async function getCupcake(id) {
  resp = await axios.get(`/api/cupcakes/${id}`);
  cupcake = resp["data"]["cupcake"];
  return cupcake;
}

function showCreateForm() {
  $($createForm).removeAttr("hidden");
}

async function createCupcake() {
  const json = {
    flavor: $("#new-flavor").val(),
    size: $("#new-size").val(),
    rating: $("#new-rating").val(),
    image: $("#new-image").val(),
  };
  const newCupcake = await axios.post("/api/cupcakes", json);
  clearAndHideForm((id = "#create-form"));
  $($cupcakeList).children().remove();
  await getCupcakes();
}

async function showAndFillUpdateForm(evt) {
  if ($(evt.target).text() === "edit") {
    cupcake = await getCupcake(evt.target.getAttribute("data-id"));

    $("#id").val(cupcake["id"]);
    $("#flavor").val(cupcake["flavor"]);
    $("#size").val(cupcake["size"]);
    $("#rating").val(cupcake["rating"]);
    $("#image").val(cupcake["image"]);
    $($updateForm).removeAttr("hidden");
  }
}

async function updateCupcake(evt) {
  const json = {
    flavor: $("#flavor").val(),
    size: $("#size").val(),
    rating: $("#rating").val(),
    image: $("#image").val(),
  };
  const resp = await axios.patch(`/api/cupcakes/${$("#id").val()}`, json);
  clearAndHideForm((id = "#update-form"));
}

async function deleteCupcake(evt) {
  if ($(evt.target).text() === "X") {
    const cupcake_id = evt.target.getAttribute("data-id");
    const resp = await axios.delete(`/api/cupcakes/${cupcake_id}`);
    $(evt.target).parent().remove();
  }
}
