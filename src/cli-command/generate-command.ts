import { CliCommandInterface } from './cli-command.interface.js';
import {MockData} from '../types/mock-data.type';
import got from 'got';
import OfferGenerator from '../modules/offer-generator.js';
import TSVFileWriter from '../file-writer/tsv-file-writer.js';

export default class GenerateCommand implements CliCommandInterface {
  public readonly name = '--generate';
  private initialData!: MockData;

  public async execute(...parameters:string[]): Promise<void> {
    const [count, filepath, url] = parameters;
    const offerCount = Number.parseInt(count, 10);
    try {
      this.initialData = await got.get(url).json();
    } catch {
      console.log(`Can't get data from ${url}`);
    }
    const offerGenerator = new OfferGenerator(this.initialData);
    const fileWriter = new TSVFileWriter(filepath);

    for (let i = 0; i < offerCount; i++) {
      await fileWriter.write(offerGenerator.generate());
    }

    console.log(`File ${filepath} was successfully created`);
  }
}
