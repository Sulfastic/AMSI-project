import engine from '../../src/states/phaser-class';
import { describe, before, it } from 'mocha';
import assert from 'assert';

describe('dziala?', function() {

	var costam = new engine();

	it('dziala!', function() {
		assert("Phaser",costam.getEngine());
	});
});