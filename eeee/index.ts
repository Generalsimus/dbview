



// function logger(originalMethod: any, _context: any) {


//     return function replacementMethod(this: any, ...args: any[]) {
//         console.log("start:", originalMethod, _context);
//         const result = originalMethod.call(this, ...args);
//         console.log("end:", originalMethod, _context);
//         return result;
//     };
// }


// function Params(originalMethod: any, _context: any) {


//     return function replacementMethod(this: any, ...args: any[]) {
//         console.log("start Params:", originalMethod, _context);
//         const result = originalMethod.call(this, ...args);
//         console.log("end Params:", originalMethod, _context);
//         return result;
//     };
// }

// class User {
//     constructor(private name: string, private age: number) { }

//     @logger
//     greet(args) {
//         console.log(`Hello, my name is ${this.name}.`);
//     }

//     // @logger
//     // printAge() {
//     //     console.log(`I am ${this.age} years old`);
//     // }
// }

// const user = new User("Ron", 25);
// user.greet();
// // user.printAge();/


// // new User().method()

//////////////////////////////////////////////////////////////////////////////////////////////////////////////





// Parameter Decorator for Email Validation
function ValidateEmail(target: any, methodName: string, parameterIndex: number) {
    const originalMethod = target[methodName];
  
    target[methodName] = function (...args: any[]) {
      const paramValue = args[parameterIndex];
  
      // Regular expression for a simple email validation
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
      if (!emailPattern.test(paramValue)) {
        throw new Error(`Invalid email address provided for parameter at index ${parameterIndex}`);
      }
  
      return originalMethod.apply(this, args);
    };
  }
  
//   class ExampleClass {
//     // Apply the parameter decorator to validate email parameter
//     sendEmail(@ValidateEmail() email: string) {
//       console.log(`Sending email to ${email}`);
//     }
//   }
  
//   const exampleInstance = new ExampleClass();
  
//   // This will work
//   exampleInstance.sendEmail("example@email.com");
//   exampleInstance.sendEmail("exampwqele@email.com");