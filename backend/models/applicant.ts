class Applicant {
  public fullname: string;
  public address: string;
  public email: string;
  public id: number;
  public createdAt: string;

  constructor(props: Exclude<IApplicant, 'id' | 'createdAt'>) {
    if (!(this instanceof Applicant)) {
      throw TypeError('Use the operator new to create an instance');
    }
    this.fullname = props.fullname;
    this.address = props.address;
    this.email = props.email;
  }

  public save() {
    // mocks saving data into database
    this.id = randomInRange(1, 999);
    this.createdAt = new Date().toISOString();

    return Promise.resolve<IApplicant>({
      fullname: this.fullname,
      address: this.address,
      email: this.email,
      id: this.id,
      createdAt: this.createdAt,
    });
  }
}

function randomInRange(from: number, to: number) {
  const r = Math.random();
  return Math.floor(r * (to - from) + from);
}

export default Applicant;
