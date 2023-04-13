import { Level } from '../components/Level.js';

/** CHARACTERS */
import { TonyArcado } from '/src/components/characters/TonyArcado.js';
import { BellaMorello } from '/src/components/characters/BellaMorello.js';
import { SalvatoreVitale } from '/src/components/characters/SalvatoreVitale.js';
import { DominicDasher } from '/src/components/characters/DominicDasher.js';
import { AlfredoRossi } from '/src/components/characters/AlfredoRossi.js';

export const levels = {
  1: new Level({ enemy: TonyArcado }),
  2: new Level({ enemy: BellaMorello }),
  3: new Level({ enemy: SalvatoreVitale }),
  4: new Level({ enemy: DominicDasher }),
  5: new Level({ enemy: AlfredoRossi })
};
