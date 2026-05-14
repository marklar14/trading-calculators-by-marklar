import { TranslocoTestingModule } from '@jsverse/transloco';

export const translocoTestingModule = TranslocoTestingModule.forRoot({
  langs: {
    cs: {
      app: {
        name: 'Trading kalkulačky',
        tagline: 'Risk management workspace',
        navigation: {
          dashboard: 'Dashboard',
          calculators: 'Kalkulačky',
          positionSize: 'Velikost pozice',
        },
      },
      dashboard: {
        title: 'Dashboard',
        subtitle: 'Pracovní plocha pro trading kalkulačky',
        cards: {
          positionSize: {
            title: 'Position size',
            subtitle: 'Rychlý odhad velikosti pozice',
            action: 'Otevřít kalkulačku',
          },
        },
        calculators: {
          title: 'Kalkulačky',
        },
      },
      positionSize: {
        title: 'Velikost pozice',
        subtitle: 'Spočítá velikost pozice podle vstupu, stop-lossu a risku.',
        inputs: {
          title: 'Vstupy',
        },
        fields: {
          entry: 'Entry cena',
          stopLoss: 'Stop loss',
          riskAmount: 'Risk částka',
          side: 'Směr',
          units: 'Jednotky risku',
          account: 'Velikost účtu',
          percentage: 'Risk procento',
          takeProfit: 'Take profit cena (volitelné)',
        },
        side: {
          long: 'Long',
          short: 'Short',
        },
        units: {
          quantity: 'Pevná částka',
          percentage: 'Procento',
        },
        result: {
          title: 'Výsledek',
          quantity: 'Quantity',
          units: 'kusů',
          positionValue: 'Hodnota pozice',
          riskReward: 'Risk / Reward',
          potentialProfit: 'Potenciální zisk',
          rating: 'Hodnocení',
          feesHint:
            'Potenciální zisk je bez fees. Poplatky brokera nebo burzy mohou finální výsledek snížit.',
          leverageMargin: 'Margin podle leverage',
          leverageHint:
            'Leverage nemění výpočet risku na stop-lossu. Mění jen potřebný margin.',
        },
        riskReward: {
          rating: {
            POOR: 'Špatné',
            MINIMUM: 'Minimum',
            OK: 'Použitelné',
            GOOD: 'Dobré',
            IDEAL: 'Ideální',
          },
        },
        validation: {
          invalidInputs: 'Zadej platné hodnoty větší než nula.',
          tooSmallRisk: 'Risk je příliš malý na jeden celý kus.',
        },
      },
    },
  },
  translocoConfig: {
    availableLangs: ['cs'],
    defaultLang: 'cs',
  },
});
