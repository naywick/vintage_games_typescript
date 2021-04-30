```
let blahName: string = "tom";
let a: number[] = [];

a.push(1);

function f(a: number, b: number): string {
  return (a+b).toString();
}

Math.floor( Number.parseFloat(f(3,4)) );

const user: { id: number, name: string } = {
  id: 234,
  name: "tom"
};

function welcome_user(u: { id: number, name: string }) {
  console.log(`Hi ${u.name}`);
}

welcome_user({ id: 3, name: "Bob" });

type Member = { id: number, name: string };

const member: Member = {
  id: 2,
  name: "Nayela"
};

function welcome_member(m: Member) {
}

// would be an error
//welcome_member(null);

welcome_member(member);
welcome_member(user);

class ClassUser {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

function welcome_class_user(u: ClassUser) {
  console.log(`Hello ${u.name}`);
}

const c_user = new ClassUser(234, "Tom");
welcome_class_user(c_user);
welcome_class_user(user);
welcome_class_user(member);
```
