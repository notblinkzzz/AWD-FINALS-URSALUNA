let platforms = [];

window.onload = function () {
  getPlatforms();
};

function getPlatforms() {
  axios
    .get("http://localhost:3000/api/LanguageLearner/platforms")
    .then((response) => {
      platforms = response.data;
      displayPlatforms(platforms);
    })
    .catch((error) => {
      alert("Error fetching platforms: " + error.message);
    });
}

function displayPlatforms(platformsList) {
  const platformTable = document.getElementById("platformTable");
  platformTable.innerHTML = "";

  platformsList.forEach((platform) => {
    platformTable.innerHTML += `
          <tr class="border-b">
            <td class="p-4">${platform.id}</td>
            <td class="p-4">${platform.name}</td>
            <td class="p-4">${platform.website}</td>
            <td class="p-4">${platform.languagesOffered}</td>
            <td class="p-4">
              <button onclick="openViewPlatformModal(${platform.id})" class="text-blue-500 hover:text-blue-700 mr-5">View</button>
              <button onclick="openEditPlatformModal(${platform.id})" class="text-blue-500 hover:text-blue-700">Update</button>
              <button onclick="deletePlatform(${platform.id})" class="text-red-500 hover:text-red-700 ml-4">Delete</button>
            </td>
          </tr>
        `;
  });
}

function openAddPlatformModal() {
  document.getElementById("addPlatformModal").classList.remove("hidden");
}

function closeAddPlatformModal() {
  document.getElementById("addPlatformModal").classList.add("hidden");
}

function addPlatform(event) {
  event.preventDefault();

  const name = document.getElementById("platformName").value;
  const website = document.getElementById("platformWebsite").value;
  const languages = document.getElementById("platformLanguages").value;
  const description = document.getElementById("platformDescription").value;

  axios
    .post("http://localhost:3000/api/LanguageLearner/platforms", {
      name,
      website,
      languagesOffered: languages,
      description,
      submittedBy: "admin", // Static value or dynamically set by your app
    })
    .then((response) => {
      alert("Platform Added: " + JSON.stringify(response.data));
      closeAddPlatformModal();
      getPlatforms();
    })
    .catch((error) => {
      alert("Error adding platform: " + error.message);
    });
}

function openEditPlatformModal(platformId) {
  const platform = platforms.find((p) => p.id === platformId);
  document.getElementById("editPlatformId").value = platform.id;
  document.getElementById("editPlatformName").value = platform.name;
  document.getElementById("editPlatformWebsite").value = platform.website;
  document.getElementById("editPlatformLanguages").value =
    platform.languagesOffered;
  document.getElementById("editPlatformDescription").value =
    platform.description;
  document.getElementById("editPlatformModal").classList.remove("hidden");
}

function closeEditPlatformModal() {
  document.getElementById("editPlatformModal").classList.add("hidden");
}

function updatePlatform(event) {
  event.preventDefault();

  const platformId = document.getElementById("editPlatformId").value;
  const updatedName = document.getElementById("editPlatformName").value;
  const updatedWebsite = document.getElementById("editPlatformWebsite").value;
  const updatedLanguages = document.getElementById(
    "editPlatformLanguages"
  ).value;
  const updatedDescription = document.getElementById(
    "editPlatformDescription"
  ).value;

  axios
    .put(
      `http://localhost:3000/api/LanguageLearner/admin/platforms/${platformId}`,
      {
        name: updatedName,
        website: updatedWebsite,
        languagesOffered: updatedLanguages,
        description: updatedDescription,
      }
    )
    .then((response) => {
      alert("Platform Updated: " + JSON.stringify(response.data));
      closeEditPlatformModal();
      getPlatforms();
    })
    .catch((error) => {
      alert("Error updating platform: " + error.message);
    });
}

function deletePlatform(platformId) {
  if (confirm("Are you sure you want to delete this platform?")) {
    axios
      .delete(
        `http://localhost:3000/api/LanguageLearner/admin/platforms/${platformId}`
      )
      .then((response) => {
        alert("Platform Deleted: " + response.data.message);
        getPlatforms();
      })
      .catch((error) => {
        alert("Error deleting platform: " + error.message);
      });
  }
}

function openViewPlatformModal(platformId) {
  const platform = platforms.find((p) => p.id === platformId);
  const platformDetails = document.getElementById("platformDetails");

  platformDetails.innerHTML = `
        <p><strong>Name:</strong> ${platform.name}</p>
        <p><strong>Website:</strong> <a href="${platform.website}" target="_blank">${platform.website}</a></p>
        <p><strong>Languages Offered:</strong> ${platform.languagesOffered}</p>
        <p><strong>Description:</strong> ${platform.description}</p>
      `;

  document.getElementById("viewPlatformModal").classList.remove("hidden");
}

function closeViewPlatformModal() {
  document.getElementById("viewPlatformModal").classList.add("hidden");
}
