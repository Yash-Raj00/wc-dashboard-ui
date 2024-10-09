export const SymboticDummyData = [
  { id: 22, value: 201, min: 200, max: 10000, label: "200+" },
  { id: 21, value: 101, min: 100, max: 200, label: "101-200" },
  { id: 1, value: 100, min: 90, max: 100, label: "100" },
  { id: 3, value: 90, min: 80, max: 90, label: "90" },
  { id: 5, value: 80, min: 70, max: 80, label: "80" },
  { id: 7, value: 70, min: 60, max: 70, label: "70" },
  { id: 9, value: 60, min: 50, max: 60, label: "60" },
  { id: 11, value: 50, min: 45, max: 50, label: "50" },
  { id: 12, value: 45, min: 40, max: 45, label: "45" },
  { id: 13, value: 40, min: 35, max: 40, label: "40" },
  { id: 14, value: 35, min: 30, max: 35, label: "35" },
  { id: 15, value: 30, min: 25, max: 30, label: "30" },
  { id: 16, value: 25, min: 20, max: 25, label: "25" },
  { id: 17, value: 20, min: 15, max: 20, label: "20" },
  { id: 18, value: 15, min: 10, max: 15, label: "15" },
  { id: 19, value: 10, min: 5, max: 10, label: "10" },
  { id: 20, value: 5, min: 0, max: 5, label: "5" },
];
export const SymboticGraphDummyData = {
  data: [
    {
      putawayAIBPallets: 25,
      putawayMIBCases: 100,
      minutesPalletsInPutawayQueue: 140,
      replenishmentAIBPallets: 40,
      replenishmentMIBCases: 62,
      minutesPalletsInReplenQueue: 350,
    },
  ],
  meta: [
    {
      statuses: [
        {
          status: "good",
          color: "rgba(18, 134, 92, 1)",
        },
        {
          status: "warning",
          color: "rgba(216, 165, 33, 1)",
        },
        {
          status: "over",
          color: "rgba(208, 83, 83, 1)",
        },
      ],
      maxQueue: 60,
      receivingAllocationPercent: 30,
      belowQueueVariance: 5,
      maxCases: 100,
      maxMinutesForPalletsInPutawayQueue: 180,
      maxMinutesForPalletsInReplenQueue: 300,
    },
  ],
};

export const INTERVAL_OPTIONS = [
  { text: "None", value: 0 },
  { text: "1 min", value: 60 },
  { text: "1 min 15 sec", value: 75 },
  { text: "1 min 30 sec", value: 90 },
  { text: "1 min 45 sec", value: 105 },
  { text: "2 min", value: 120 },
];

export const SymboticGraphDummyData2 = {
  data: [
    {
      putawayAIBPallets: 48,
      putawayMIBCases: 120,
      minutesPalletsInPutawayQueue: 60,
      replenishmentAIBPallets: 59,
      replenishmentMIBCases: 98,
      minutesPalletsInReplenQueue: 120,
    },
  ],
  meta: [
    {
      statuses: [
        {
          status: "good",
          color: "rgba(18, 134, 92, 1)",
        },
        {
          status: "warning",
          color: "rgba(216, 165, 33, 1)",
        },
        {
          status: "over",
          color: "rgba(208, 83, 83, 1)",
        },
      ],
      maxQueue: 60,
      receivingAllocationPercent: 30,
      belowQueueVariance: 5,
      maxCases: 100,
      maxMinutesForPalletsInPutawayQueue: 180,
      maxMinutesForPalletsInReplenQueue: 300,
    },
  ],
};

export const SymboticTableDummyData = [
  {
    lpn: "2100102239",
    itemDescription: "COFFEE GROUND FRENCH VANILLA",
    palletQuantity: 45,
    priority: 1,
    palletStatus: "In Transit",
  },
  {
    lpn: "1339136095",
    itemDescription: "GARDEN COMBO SAUCE",
    palletQuantity: 60,
    priority: 5,
    palletStatus: "In Reserve",
  },
];

export const allTabs = ["Selection", "Loading", "Crossdock", "Symbotic"];
