function populateSummary(projName, envName, totalFlags) {
  const projectField = document.getElementById('summary-project-name');
  projectField.innerText = projName;

  const envField = document.getElementById('summary-env-name');
  envField.innerText = envName;

  const totalFlagField = document.getElementById('summary-total-flags');
  totalFlagField.innerText = totalFlags;
}

module.exports = populateSummary;
