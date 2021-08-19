import { BodyParts } from './bodyParts.enum';
import { Colours } from './colours.enum';

export interface ISpin {
  colour: Colours;
  bodyPart: BodyParts;
}

// TODO: create a SpinRecord class which implements ISpin and adds a new attribute num:number
export class SpinRecord implements ISpin {
  colour: Colours;
  bodyPart: BodyParts;

  constructor(colour: Colours, bodyPart: BodyParts) {
    this.colour = colour;
    this.bodyPart = bodyPart;
  }
}
