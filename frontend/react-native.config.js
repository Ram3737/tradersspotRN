module.exports = {
  dependencies: {
    // ... other dependencies
  },
  assets: [
    // ... other assets
  ],
  android: {
    // Add custom configuration options here
    useAndroidX: true,
    manifestMerger: true,
    packageImportPath: "import com.dc.filetracker", // Change this to your package name
    permissions: ["INTERNET"],
    config: {
      manifestPlaceholders: {
        usesCleartextTraffic: "true",
      },
    },
  },
};
