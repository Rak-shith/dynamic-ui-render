/**
 * Mock Data for Development and Testing
 * Centralized mock data management
 */

// Mock configuration data
const MOCK_CONFIG = {
  "status":"Success",
  "successMessage":"DB details fetched Successfully",
  "data":{
     "page": {
       "pageName": "Field Investigation",
       "pageAttributes": {
         "fetchApiEndPoint": "v1/fetch-api"
       },
       "tabs": [
         {
           "rbackey":"applicant",
           "tabName":"Applicant",
           "staticPage":false,
           "profileCardData":true,
           "sections":[
             {
               "rbackey":"additional_details",
               "sectionName":"Additional Details",
               "fromPreviousStage":true,
               "componentName":null,
               "webSectionAttributes":{
                 "fetchApiEndPoint":"dde/v1/fetch-additional-details",
                 "saveApiEndPoint":"dde/v1/save-or-update-additional-details",
                 "validationSchema":{}
               },
               "elements":[
                 {
                   "component":"textfield",
                   "apiKey":"noOfYearsInCurrentAddress",
                   "label":"No. Of Years at Current Address",
                   "type":"number",
                   "api":null,
                   "options":null,
                   "visible":true,
                   "autoFocus":false,
                   "prefix":null,
                   "optionToRenderDependentFields":null,
                   "dependentFields":null,
                   "validation":{
                      "required":true,
                      "minLength":null,
                      "maxLength":3
                   }
                 },
                 {
                     "component":"textfield",
                     "apiKey":"noOfMonthsInCurrentAddress",
                     "label":"No. Of Months at Current Address",
                     "type":"number",
                     "api":null,
                     "options":null,
                     "visible":true,
                     "autoFocus":false,
                     "prefix":null,
                     "optionToRenderDependentFields":null,
                     "dependentFields":null,
                     "validation":{
                       "required":true,
                       "minLength":null,
                       "maxLength":5
                     }
                 },
                 {
                   "component":"textfield",
                   "apiKey":"waMobileNumber",
                   "label":"Whatsapp Number",
                   "type":"number",
                   "api":null,
                   "options":null,
                   "visible":true,
                   "autoFocus":false,
                   "prefix":"+91",
                   "alwaysDisabled":false,
                   "validation":{"required":true,"minLength":null,"maxLength":10}
                 },
                 {
                   "component":"dropdown",
                   "apiKey":"educationalQualification",
                   "label":"Education Qualification",
                   "type":"dropdown",
                   "api":"Education Qualification",
                   "options":null,
                   "visible":true,
                   "autoFocus":false,
                   "prefix":null,
                   "optionToRenderDependentFields":null,
                   "dependentFields":null,
                   "validation":{"required":false,"minLength":null,"maxLength":null}
                 },
                 {
                   "component":"dropdown",
                   "apiKey":"religion",
                   "label":"Religion",
                   "type":"dropdown",
                   "api":"Religion",
                   "options":null,
                   "visible":true,
                   "autoFocus":false,
                   "prefix":null,
                   "optionToRenderDependentFields":null,
                   "dependentFields":null,
                   "validation":{"required":true,"minLength":null,"maxLength":null}
                 },
                 {
                   "component":"dropdown",
                   "apiKey":"casteCategory",
                   "label":"Caste Category",
                   "type":"dropdown",
                   "api":"Caste Category",
                   "options":null,
                   "visible":true,
                   "autoFocus":false,
                   "prefix":null,
                   "optionToRenderDependentFields":null,
                   "dependentFields":null,
                   "validation":{"required":true,"minLength":null,"maxLength":null}
                 },
                 {
                   "component":"radioButton",
                   "apiKey":"isCurrentAddressSameAsPermanent",
                   "label":"Is Current Address Same as Permanent Address",
                   "type":"radio",
                   "api":null,
                   "options":[
                     {"label":"Yes","value":true},
                     {"label":"No","value":false}
                   ],
                   "visible":true,
                   "autoFocus":false,
                   "prefix":null,
                   "optionToRestrictDependents":false,
                   "restrictedLabelDetails":[
                     {
                       "component":"label",
                       "type":"info",
                       "label":"Current Address Details should be uploaded in mobile application"
                     }
                   ],
                   "optionToRenderDependentFields":false,
                   "dependentFields":[
                     {
                       "component":"image",
                       "apiKey":"addressProofLink",
                       "label":"Current Address",
                       "type":"image",
                       "api":null,
                       "options":null,
                       "visible":true,
                       "autoFocus":false,
                       "prefix":null,
                       "optionToRenderDependentFields":null,
                       "dependentFields":null,
                       "validation":{"required":true,"minLength":null,"maxLength":null},
                       "imageStyle":{"width":"150px","height":"150px","borderRadius":"50%","border":"2px solid #ccc"}
                     },
                     {
                       "component":"textfield",
                       "apiKey":"houseNumber",
                       "label":"House Number",
                       "type":"text",
                       "api":null,
                       "options":null,
                       "visible":true,
                       "autoFocus":false,
                       "prefix":null,
                       "optionToRenderDependentFields":null,
                       "dependentFields":null,
                       "validation":{"required":true,"minLength":null,"maxLength":10}
                     },
                     {
                       "component":"textfield",
                       "apiKey":"street",
                       "label":"Street",
                       "type":"text",
                       "api":null,
                       "options":null,
                       "visible":true,
                       "autoFocus":false,
                       "prefix":null,
                       "optionToRenderDependentFields":null,
                       "dependentFields":null,
                       "validation":{"required":true,"minLength":null,"maxLength":15}
                     },
                     {
                       "component":"pincode",
                       "apiKey":"pincode",
                       "label":"Pincode",
                       "type":"text",
                       "api":null,
                       "options":null,
                       "visible":true,
                       "autoFocus":false,
                       "prefix":null,
                       "optionToRenderDependentFields":null,
                       "dependentFields":null,
                       "validation":{"required":true,"minLength":null,"maxLength":null}
                     },
                     {
                       "component":"dropdown",
                       "apiKey":"residenceType",
                       "label":"Residence Type",
                       "type":"dropdown",
                       "api":"Residence Type",
                       "options":null,
                       "visible":true,
                       "autoFocus":false,
                       "prefix":null,
                       "optionToRenderDependentFields":null,
                       "dependentFields":null,
                       "validation":{"required":true,"minLength":null,"maxLength":null}
                     },
                     {
                       "component":"textAreaSmall",
                       "apiKey":"fullAddress",
                       "label":"Full Address",
                       "type":"text",
                       "api":null,
                       "options":null,
                       "visible":true,
                       "autoFocus":false,
                       "prefix":null,
                       "optionToRenderDependentFields":null,
                       "dependentFields":null,
                       "alwaysDisabled":true,
                       "validation":{"required":true,"minLength":null,"maxLength":null}
                     }
                   ],
                   "validation":{"required":true,"minLength":null,"maxLength":null}
                 },
                 {
                   "component":"radioButton",
                   "apiKey":"isWaNumberSame",
                   "label":"Previously provide mobile number is same as whatsapp number",
                   "type":"radio",
                   "api":null,
                   "options":[
                     {"label":"Yes","value":true},
                     {"label":"No","value":false}
                   ],
                   "visible":true,
                   "autoFocus":false,
                   "prefix":null,
                   "optionToRenderDependentFields":null,
                   "dependentFields":null,
                   "alwaysDisabled":false,
                   "validation":{"required":true,"minLength":null,"maxLength":null}
                 }
               ]
             },
             {
               "rbackey":"kyc_details",
               "sectionName":"KYC Details",
               "fromPreviousStage":true,
               "componentName":"KycDetails",
               "webSectionAttributes":{
                 "fetchApiEndPoint":"dde/v1/fetch-additional-details",
                 "saveApiEndPoint":"dde/v1/save-or-update-additional-details",
                 "validationSchema":{}
               },
               "elements": [
                 {
                   "component":"textAreaSmall",
                   "apiKey":"kyc_Address",
                   "label":"Full Address",
                   "type":"text",
                   "api":null,
                   "options":null,
                   "visible":true,
                   "autoFocus":false,
                   "prefix":null,
                   "optionToRenderDependentFields":null,
                   "dependentFields":null,
                   "alwaysDisabled":false,
                   "validation":{
                      "required":true,
                      "minLength":null,
                      "maxLength":null
                   }
                }
               ]
             },
             {
               "rbackey":"bureau_report",
               "sectionName":"Bureau Report",
               "fromPreviousStage":true,
               "componentName":"BeuroReport",
               "elements": []
             },
             {
               "rbackey":"personal_details",
               "sectionName":"Personal Details",
               "fromPreviousStage":true,
               "componentName":"PersonalDetails",
               "elements": []
             }
           ]
         },
         {
           "rbackey":"application_details",
           "tabName":"Application Details",
           "staticPage":false,
           "profileCardData":false,
           "sections":[
             {
               "rbackey":"agricultural_details",
               "sectionName":"Agricultural Details",
               "fromPreviousStage":true,
               "componentName":null,
               "webSectionAttributes":{
                 "fetchApiEndPoint":"dde/v1/fetch-agricultural-details",
                 "saveApiEndPoint":"dde/v1/save-or-update-Agricultural-details",
                 "validationSchema":{}
               },
               "elements":[
                 {
                   "component":"textfield",
                   "apiKey":"noOfMilkSoldToDairy",
                   "label":"No Of Litres Milk Sold Daily To Dairy(In Litres)",
                   "type":"number",
                   "api":null,
                   "options":null,
                   "visible":true,
                   "autoFocus":false,
                   "prefix":null,
                   "optionToRenderDependentFields":null,
                   "dependentFields":null,
                   "validation":{
                      "required":true,
                      "minLength":null,
                      "maxLength":4
                   }
                },
                {
                   "component":"textfield",
                   "apiKey":"avgPerLitreMilkPrice",
                   "label":"Avg. Per Litre Milk Price",
                   "type":"number",
                   "api":null,
                   "options":null,
                   "visible":true,
                   "autoFocus":false,
                   "prefix":"₹",
                   "optionToRenderDependentFields":null,
                   "dependentFields":null,
                   "validation":{
                      "required":true,
                      "minLength":null,
                      "maxLength":3
                   }
                },
                {
                   "component":"textfield",
                   "apiKey":"vintageDairyBusinessMonths",
                   "label":"Vintage In Dairy Business (In Months)",
                   "type":"number",
                   "api":null,
                   "options":null,
                   "visible":true,
                   "autoFocus":false,
                   "prefix":null,
                   "optionToRenderDependentFields":null,
                   "dependentFields":null,
                   "validation":{
                      "required":true,
                      "minLength":null,
                      "maxLength":5
                   }
                },
                {
                   "component":"dropdown",
                   "apiKey":"milkPaymentFrequency",
                   "label":"Milk Payment Frequency",
                   "type":"dropdown",
                   "api":"Milk Payment Frequency",
                   "options":null,
                   "visible":true,
                   "autoFocus":false,
                   "prefix":null,
                   "optionToRenderDependentFields":null,
                   "dependentFields":null,
                   "validation":{
                      "required":true,
                      "minLength":null,
                      "maxLength":null
                   }
                },
                {
                   "component":"dropdown",
                   "apiKey":"proposedCattleType",
                   "label":"Proposed Cattle Type",
                   "type":"dropdown",
                   "api":"Proposed Cattle Type",
                   "options":null,
                   "visible":true,
                   "autoFocus":false,
                   "prefix":null,
                   "optionToRenderDependentFields":null,
                   "dependentFields":null,
                   "validation":{
                      "required":true,
                      "minLength":null,
                      "maxLength":null
                   }
                },
                {
                   "component":"textfield",
                   "apiKey":"noOfMilchingCattle",
                   "label":"No Of Proposed Milching Cattle",
                   "type":"number",
                   "api":null,
                   "options":null,
                   "visible":true,
                   "autoFocus":false,
                   "prefix":null,
                   "optionToRenderDependentFields":null,
                   "dependentFields":null,
                   "validation":{
                      "required":true,
                      "minLength":null,
                      "maxLength":3
                   }
                },
                {
                 "component":"multidropdown",
                 "apiKey":"cropOwned",
                 "label":"Name of Crop Owned by Farmer",
                 "type":"dropdown",
                 "api":"Name of Crop Owned by Farmer",
                 "options":null,
                 "visible":true,
                 "autoFocus":false,
                 "prefix":null,
                 "optionToRenderDependentFields":null,
                 "dependentFields":null,
                 "validation":{
                    "required":false,
                    "minLength":null,
                    "maxLength":null
                 }
               },
                {
                   "component":"radioButton",
                   "apiKey":"waterAvailability",
                   "label":"Water Availability",
                   "type":"radio",
                   "api":null,
                   "options":[
                      {
                         "label":"Yes",
                         "value":true
                      },
                      {
                         "label":"No",
                         "value":false
                      }
                   ],
                   "visible":true,
                   "autoFocus":false,
                   "prefix":null,
                   "optionToRenderDependentFields":null,
                   "dependentFields":null,
                   "validation":{
                      "required":false,
                      "minLength":null,
                      "maxLength":null
                   }
                },
                {
                   "component":"radioButton",
                   "apiKey":"cattleEffectedByDisease1Y",
                   "label":"Existing Cattle Affected By Any Disease In 1 Yr.",
                   "type":"radio",
                   "api":null,
                   "options":[
                      {
                         "label":"Yes",
                         "value":true
                      },
                      {
                         "label":"No",
                         "value":false
                      }
                   ],
                   "visible":true,
                   "autoFocus":false,
                   "prefix":null,
                   "optionToRenderDependentFields":null,
                   "dependentFields":null,
                   "validation":{
                      "required":false,
                      "minLength":null,
                      "maxLength":null
                   }
                },
                {
                   "component":"radioButton",
                   "apiKey":"insuranceForCattle",
                   "label":"Insurance For Existing Cattle Done?",
                   "type":"radio",
                   "api":null,
                   "options":[
                      {
                         "label":"Yes",
                         "value":true
                      },
                      {
                         "label":"No",
                         "value":false
                      }
                   ],
                   "visible":true,
                   "autoFocus":false,
                   "prefix":null,
                   "optionToRenderDependentFields":null,
                   "dependentFields":null,
                   "validation":{
                      "required":false,
                      "minLength":null,
                      "maxLength":null
                   }
                },
                {
                   "component":"radioButton",
                   "apiKey":"cattleShed",
                   "label":"Cattle shed Available?",
                   "type":"radio",
                   "api":null,
                   "options":[
                      {
                         "label":"Yes",
                         "value":true
                      },
                      {
                         "label":"No",
                         "value":false
                      }
                   ],
                   "visible":true,
                   "autoFocus":false,
                   "prefix":null,
                   "optionToRenderDependentFields":null,
                   "dependentFields":null,
                   "validation":{
                      "required":false,
                      "minLength":null,
                      "maxLength":null
                   }
                },
                {
                   "component":"radioButton",
                   "apiKey":"milkPaymentMode",
                   "label":"Milk Payment Mode",
                   "type":"radio",
                   "api":null,
                   "options":[
                      {
                         "label":"Cash",
                         "value":"Cash"
                      },
                      {
                         "label":"Bank",
                         "value":"Bank"
                      }
                   ],
                   "visible":true,
                   "autoFocus":false,
                   "prefix":null,
                   "optionToRenderDependentFields":null,
                   "dependentFields":null,
                   "validation":{
                      "required":true,
                      "minLength":null,
                      "maxLength":null
                   }
                }
               ]
             }
           ]
         },
         {
           "rbackey":"field_investigation",
           "tabName":"Field Investigation",
           "staticPage":false,
           "profileCardData":false,
           "sections":[
             {
               "rbackey":"capture_details",
               "sectionName":"Capture Details",
               "fromPreviousStage":false,
               "componentName":null,
               "elements":[
                 {
                   "component":"dynamicImages",
                   "apiKey":"House Picture",
                   "label":"House Picture",
                   "type":"image",
                   "visible":true
                 },
                 {
                   "component":"LocationComponnet",
                   "apiKey":"currentLocation",
                   "label":"Current Location",
                   "visible":true,
                   "validation":{"required":true,"minLength":null,"maxLength":null}
                 }
               ]
             }
           ]
         }
       ]
     }
  }
};

// Mock dropdown options
const MOCK_DROPDOWN_OPTIONS = {
  "Education Qualification": [
    { label: "High School", value: "high_school" },
    { label: "Bachelor's Degree", value: "bachelors" },
    { label: "Master's Degree", value: "masters" },
    { label: "PhD", value: "phd" }
  ],
  "Religion": [
    { label: "Hindu", value: "hindu" },
    { label: "Muslim", value: "muslim" },
    { label: "Christian", value: "christian" },
    { label: "Sikh", value: "sikh" },
    { label: "Other", value: "other" }
  ],
  "Caste Category": [
    { label: "General", value: "general" },
    { label: "OBC", value: "obc" },
    { label: "SC", value: "sc" },
    { label: "ST", value: "st" }
  ],
  "Residence Type": [
    { label: "Own House", value: "own_house" },
    { label: "Rented", value: "rented" },
    { label: "Family House", value: "family_house" }
  ],
  "Name of Crop Owned by Farmer": [
    { label: "Rice", value: "rice" },
    { label: "Wheat", value: "wheat" },
    { label: "Cotton", value: "cotton" },
    { label: "Sugarcane", value: "sugarcane" }
  ],
  "Milk Payment Frequency": [
    { label: "Daily", value: "daily" },
    { label: "Weekly", value: "weekly" },
    { label: "Monthly", value: "monthly" }
  ],
  "Proposed Cattle Type": [
    { label: "Cow", value: "cow" },
    { label: "Buffalo", value: "buffalo" },
    { label: "Goat", value: "goat" }
  ]
};

// Mock application profile data
const MOCK_APPLICATION_PROFILE = {
  name: "Ganesh Jange",
  phone: "+91 9769797997",
  applicationId: "ISFL000001067",
  customerId: "NA",
  avatar: null,
  status: "Under Review",
  createdAt: "2024-01-15T10:30:00Z",
  lastUpdated: "2024-01-20T14:45:00Z"
};

// Mock user data
const MOCK_USER_DATA = {
  id: "user_123",
  name: "John Doe",
  email: "john.doe@iifl.com",
  role: "Field Officer",
  permissions: ["read", "write", "upload"],
  preferences: {
    theme: "light",
    language: "en",
    notifications: true
  }
};

// Mock form data for testing
const MOCK_FORM_DATA = {
  noOfYearsInCurrentAddress: "5",
  noOfMonthsInCurrentAddress: "6",
  waMobileNumber: "9876543210",
  educationalQualification: "bachelors",
  religion: "hindu",
  casteCategory: "general",
  isCurrentAddressSameAsPermanent: false,
  isWaNumberSame: true
};

// Export all mock data
export const MOCK_DATA = {
  CONFIG: MOCK_CONFIG,
  DROPDOWN_OPTIONS: MOCK_DROPDOWN_OPTIONS,
  APPLICATION_PROFILE: MOCK_APPLICATION_PROFILE,
  USER_DATA: MOCK_USER_DATA,
  FORM_DATA: MOCK_FORM_DATA
};

// Helper functions for mock data manipulation
export const getMockDropdownOptions = (apiKey) => {
  return MOCK_DROPDOWN_OPTIONS[apiKey] || [];
};

export const getMockConfigSection = (rbackey) => {
  const sections = MOCK_CONFIG.data.page.tabs.flatMap(tab => tab.sections);
  return sections.find(section => section.rbackey === rbackey);
};

export const getMockFormElement = (apiKey) => {
  const sections = MOCK_CONFIG.data.page.tabs.flatMap(tab => tab.sections);
  const elements = sections.flatMap(section => section.elements || []);
  return elements.find(element => element.apiKey === apiKey);
};
