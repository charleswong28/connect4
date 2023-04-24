import * as readline from 'readline';

type CheckFunction<T> = (answer: any) => answer is T;
type ParseFunction<T> = (answer: any) => T;

const ask = <T>(question: string, check: CheckFunction<T>, parse: ParseFunction<T>): Promise<T> => {
  return new Promise((resolve) => {
    const rl = readline.createInterface(process.stdin, process.stdout);

    rl.question(question, (answer) => {
      if (check(answer)) {
        resolve(parse(answer));
        rl.close();
      } else {
        console.log('Invalid input.');
        rl.close();
        resolve(ask(question, check, parse));
      }
    });
  });
}

export default ask;