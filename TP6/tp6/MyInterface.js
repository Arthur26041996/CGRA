class MyInterface extends CGFinterface {


	/**
	 * MyInterface
	 * @constructor
	 */
 	constructor () {
 		super();
 	}
	
	/**
	 * init
	 * @param {CGFapplication} application
	 */
	init(application) {
		// call CGFinterface init
		super.init(application);

		// init GUI. For more information on the methods, check:
		//  http://workshop.chromeexperiments.com/examples/gui

		this.gui = new dat.GUI();
	
		
		var luz=this.gui.addFolder("Luzes");
		luz.open();

		luz.add(this.scene, 'light0');
		luz.add(this.scene, 'light1');
		luz.add(this.scene, 'light2');
		luz.add(this.scene, 'light3');
		luz.add(this.scene, 'light4');

		// add a slider
		// must be a numeric variable of the scene, initialized in scene.init e.g.
		// this.speed=3;
		// min and max values can be specified as parameters

		this.gui.add(this.scene, 'speed', -5, 5);
		this.gui.add(this.scene,'currVehicleAppearance',this.scene.vehicleAppearanceList);
		this.gui.add(this.scene,'axix');
		//call initKeys
		this.initKeys();

		return true;
	};

	initKeys() {
		this.scene.gui=this;
		this.processKeyboard=function(){};
		this.activeKeys={};
	};

	processKeyDown(event) {
		this.activeKeys[event.code]=true;
	};

	processKeyUp(event) {
		this.activeKeys[event.code]=false;
	};

	isKeyPressed(keyCode) {
		return this.activeKeys[keyCode] || false;
	};

};