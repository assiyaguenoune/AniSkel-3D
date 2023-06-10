window.addEventListener('DOMContentLoaded', function(){
    var canvas = document.getElementById('canvas');

    var engine = new BABYLON.Engine(canvas, true);
    var createScene = function(){
        //create scene
        var scene = new BABYLON.Scene(engine);

        //set scene color
        scene.clearColor = new BABYLON.Color3.White();

        //create box
        //var box = BABYLON.Mesh.CreateBox("Box",4.0,scene);
        //var box2 = BABYLON.Mesh.CreateBox("Box2",8.0,scene);
        

        //create camera

                // FreeCamera
        /*var camera = new BABYLON.FreeCamera('camera1', new BABYLON.
        Vector3(0, 0,-10), scene);
        camera.attachControl(canvas,true);*/

                // ArcRotateCamera
        /*var camera= new BABYLON.ArcRotateCamera("arcCamera",
            BABYLON.Tools.ToRadians(45),
            BABYLON.Tools.ToRadians(45),
            10.0,box.position.scene);
        camera.setTarget(BABYLON.Vector3.Zero());
        camera.attachControl(canvas,true);
        camera.keysUp.push(87);
        camera.keysDown.push(83);
        camera.keysLeft.push(65);
        camera.keysRight.push(68); 
        camera.keysRight.push(68);*/

        const camera = new BABYLON.ArcRotateCamera("Camera", 1, 1, 4, BABYLON.Vector3.Zero(), scene);
        camera.attachControl(canvas, false);

                // FollowCamera
        /*var camera= new BABYLON.FollowCamera("Folllow", 
            new BABYLON.Vector3.Zero(), scene);
        camera.target= box;*
        // radius = how much the camera far to the object
        camera.radius= 10;
        camera.heightOffset=0;
        camera.attchControl(canvas, true);*/
        
        //create light
        /* light = new BABYLON.HemisphericLight('light', 
            new BABYLON.Vector3(0,1,0), scene);*/
        const light = new BABYLON.PointLight("light",new BABYLON.Vector3(5,10,0), scene);
        // light color
        light.parent= camera;
        light.diffuse = new BABYLON.Color3(1,1,1);

        //Ceate action

        scene.actionManager= new BABYLON.ActionManager(scene);
        scene.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(
                {trigger : BABYLON.ActionManager.OnKeyUpTrigger, parameter : ""},
                function (){
                    light.setEnabled(!light.isEnabled());
                }));

        //add materials
        // var material= new BABYLON.StandardMaterial("material",scene);
            // wireframe = just edges
        // material.wireframe= true;
        //material.diffuseColor= new BABYLON.Color3.Blue();
                // How the light interacte with the surface
        //material.specularColor= new BABYLON.Color3.Red();
                // Object transparence
        //material.alpha =0.8;
        /*material.diffuseTexture= new BABYLON.Texture("", scene);
        material.bumpTexture= new BABYLON.Texture("NormalMap.png", scene);
        box.material= material;*/

        BABYLON.SceneLoader.ImportMesh("","","cheval.babylon",scene,
                function(newMeshes){
                    newMeshes.forEach(function(mesh){
                        mesh.rotation= new BABYLON.Vector3(
                            BABYLON.Tools.ToRadians(45),0,0);
                    })});           

        return scene;
    }

    var scene = createScene();
    engine.runRenderLoop(function(){
            // Material
       /* var material= scene.getMeshByName("Box").material;
        material.alpha -=0.007;
        if(material.alpha <= 0) material.alpha=1;*/

            // Light
        /*var light =scene.getLightByName("light");
        light.diffuse.g +=0.008;
        light.diffuse.b += 0.008;*/
       // scene.getMeshByName("box").position.z+=0.01;   
        scene.render();

    }); 

});