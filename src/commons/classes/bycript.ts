import * as bcrypt from 'bcrypt';

export class ByCript {
  private static readonly salt = 10;

  public static async hash(str: string) {
    const hashed = await bcrypt.hash(str, this.salt);
    return hashed;
  }

  public static hasSync(str: string): string {
    const hashed = bcrypt.hashSync(str, this.salt);
    return hashed;
  }

  public static async compare(str: string, hashed: string): Promise<boolean> {
    const isHashedOk: boolean = await bcrypt.compare(str, hashed);
    return isHashedOk;
  }

  public static compareSync(str: string, hashed: string): boolean {
    const isHashedOk: boolean = bcrypt.compareSync(str, hashed);
    return isHashedOk;
  }
}
