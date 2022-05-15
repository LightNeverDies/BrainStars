import { configure } from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import fetch from 'jest-fetch-mock'

fetch.enableMocks()
configure({ adapter: new Adapter() });