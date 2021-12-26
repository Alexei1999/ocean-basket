export type Address = {
  address: string;
  number: string;
  gps: number[];
};

export type Region = {
  region_label: string | null;
  region: string;
  addresses: Address[];
};

export type Country = {
  country_label: string | null;
  regions: Region[];
  email: string;
};

export const addresses: Country[] = [
  {
    country_label: "Москва",
    regions: [
      {
        region_label: null,
        region: "Москва",
        addresses: [
          {
            address: "ул. Мясницкая, д. 11, м. Лубянка",
            number: "+7 (977) 456 2221",
            gps: [55.761677, 37.632745],
          },
        ],
      },
    ],
    email: "marketing@oceanbasket.ru",
  },
  {
    country_label: "Казахстан",
    regions: [
      {
        region_label: "Алматы",
        region: "Алматы",
        addresses: [
          {
            address: "ул. Панфилова, 100",
            number: "+8 (775) 240 0033",
            gps: [43.256069, 76.945169],
          },
          {
            address: "мкр. Самал-2, 111, ТРЦ Dostyk Plaza, 3-й этаж",
            number: "+8 (777) 246 6878",
            gps: [43.23388, 76.957239],
          },
          {
            address:
              "ул. Розыбакиева 247А, ТРЦ Mega Center, 3-й этаж, Галерея ресторанов",
            number: "+8 (777) 240 1122",
            gps: [43.202449, 76.89197],
          },
        ],
      },
      {
        region_label: "Нур-Султан",
        region: "Нур-Султан",
        addresses: [
          {
            address: "ул. Сарайшык 7",
            number: "+8 (777) 888 9221",
            gps: [51.135321, 71.42623],
          },
          {
            address: "MEGA Silk Way, просп. Кабанбай Батыра, 62",
            number: "+8 (700) 777 9697",
            gps: [51.08921, 71.40666],
          },
        ],
      },
    ],
    email: "marketing@oceanbasket.kz",
  },
];
