
/////////////////////////////// The code starts from here/////////////////////////////////////
var sw=0,cc=0,count=0;
var swh;
var f, w, vs, R, wL, wC, imp_r, imp_theta, i, pf, lead, lag,theta;
var imp=[];
function execute_ckt1()
{
    if (sw==1)
    {
        f=parseFloat(document.getElementById('f').value);
        w= 2*3.141*f;
        vs=parseFloat(document.getElementById('vin').value) * parseFloat(document.getElementById('vin1').value);
        //alert(vs);
        R=parseFloat(document.getElementById('R').value);
        Rf= R + (2*parseFloat(document.getElementById('L').value) * 0.001 / 0.015);
        wL=parseFloat(document.getElementById('L').value) * 0.001 * w ;
        wC= 1/ (parseFloat(document.getElementById('C').value) * 0.000001 * w );
        if((document.getElementById('C').value)==0){
            wC=0;
        }
        if((document.getElementById('C').value)==0 && (document.getElementById('L').value)==0){

            document.getElementById('unity').style.display="block";
            document.getElementById('main_ckt').src="./images/unity.jpg";
        }
        else{
            document.getElementById('unity').style.display="none";
        }
        if ((document.getElementById('R').value)==0){
            window.alert('Resistance Value can not be zero,Switch off the circuit and increase it');
            return;


        }
        if ((document.getElementById('L').value)==0){
            document.getElementById('main_ckt').src="./images/RC.jpg";
        }
        if ((document.getElementById('C').value)==0){
            document.getElementById('main_ckt').src="./images/RL.jpg";
        }
        if((document.getElementById('C').value)==0 && (document.getElementById('L').value)==0){

            //document.getElementById('unity').style.display="block";
            document.getElementById('main_ckt').src="./images/unity.jpg";
        }


        imp[0]= Rf;
        imp[1]= wL - wC;
        imp_r = Math.sqrt((imp[0]*imp[0]) + (imp[1]*imp[1]));
        //alert(imp_r);
        imp_theta = Math.atan(imp[1]/imp[0]);// * (180/(Math.PI));
        theta = imp_theta*57.3;
        //alert(imp_theta);

        i=vs/imp_r;
        var fuse = document.getElementById('led');
        swh=parseFloat(document.getElementById('SW1').value);
        if (swh==2)
        {
            if (i > 5 || fuse.src.match("led_off"))
            {
                fuse.src = "./images/led_off.png";
                document.getElementById("led").style["cursor"] = "pointer";
                Alert.render('Click on the fuse.');
                changeImage1();
            }
            else
            {
                document.f1.VS.value= vs;
                document.f1.A.value= i;
                document.f1.W.value= i*i*Rf;
                pf=Math.cos(imp_theta);// * (180/(Math.PI));
                //alert(pf);
                document.f1.VR.value= i * R;
                document.f1.VL.value= i * wL;
                document.f1.VC.value= i * wC;
                document.f1.PF.value= theta;
                if (imp_theta>0){
                    document.getElementById("lead").style["background-color"] = "#86A65D";
                    document.getElementById("lag").style["background-color"] = "#D85A66";
                }
                else if (imp_theta==0){
                    document.getElementById("lead").style["background-color"] = "#C3C7C8";
                    document.getElementById("lag").style["background-color"] = "#C3C7C8";
                }
                else{
                    document.getElementById("lead").style["background-color"] = "#D85A66";
                    document.getElementById("lag").style["background-color"] = "#86A65D";
                }
                cc=1;
                perform_meter1(); perform_meter2(); perform_meter3(); perform_meter4(); perform_meter5(); perform_meter6(); perform_meter7();
            }
        }
        else
        {
            document.f1.W.value = 0; document.f1.A.value = 0; document.f1.VS.value = 0;
            document.f1.VR.value = 0; document.f1.VL.value = 0; document.f1.VC.value = 0;
            perform_meter1(); perform_meter2(); perform_meter3(); perform_meter4(); perform_meter5(); perform_meter6();
            document.getElementById("lead").style["background-color"] = "#C3C7C8";
            document.getElementById("lag").style["background-color"] = "#C3C7C8";
            Alert.render('Make the switch Closed.');
        }


    }
    else
    {
        document.f1.W.value = 0; document.f1.A.value = 0; document.f1.VS.value = 0;
        document.f1.VR.value = 0; document.f1.VL.value = 0; document.f1.VC.value = 0;
        perform_meter1(); perform_meter2(); perform_meter3(); perform_meter4(); perform_meter5(); perform_meter6();
        document.getElementById("lead").style["background-color"] = "#C3C7C8";
        document.getElementById("lag").style["background-color"] = "#C3C7C8";
    }
}

function changeImage1() {

    var image = document.getElementById('myImage');
    var im1= document.getElementById('vin');
    var im2= document.getElementById('f');
    /*var im3= document.getElementById('R');
    var im4= document.getElementById('l1');
    var im5= document.getElementById('c1');*/
    swh=parseFloat(document.getElementById('SW1').value);
    ;		if (image.src.match("s1")) {
        sw=1;
        image.src = "./images/s2.png";
        document.getElementById('main_ckt').src="./images/rlc_circuits_in_series2.png";
        im1.setAttribute('readonly', 'readonly'); im2.setAttribute('readonly', 'readonly'); //im3.setAttribute('readonly', 'readonly');
        //im4.setAttribute('readonly', 'readonly'); im5.setAttribute('readonly', 'readonly');



        if (swh==2)
        {
            execute_ckt1();
        }

    } else {
        sw=0;
        image.src = "./images/s1.png";
        document.getElementById('main_ckt').src="./images/rlc_circuits_in_series.png";
        document.getElementById('SW1').value="1";
        im1.removeAttribute('readonly'); im2.removeAttribute('readonly'); /* im3.removeAttribute('readonly');
			im4.removeAttribute('readonly'); im5.removeAttribute('readonly'); */
        document.f1.W.value = 0; document.f1.A.value = 0; document.f1.VS.value = 0;
        document.f1.VR.value = 0; document.f1.VL.value = 0; document.f1.VC.value = 0; document.f1.PF.value = 0
        perform_meter1(); perform_meter2(); perform_meter3(); perform_meter4(); perform_meter5(); perform_meter6(); perform_meter7();
        document.getElementById("lead").style["background-color"] = "#C3C7C8";
        document.getElementById("lag").style["background-color"] = "#C3C7C8";
    }
}

function change_led() {
    var fuse = document.getElementById('led');
    fuse.src = "./images/led_on.png";
    document.f1.R.value = 50;
}

function simulate_rc1()
{

    if(cc==0){
        Alert.render("Please execute the circuit once to get the voltmeter readings.");
        return;
    }
    cc=0;
    count=count+1;
    if (count==1)
    {
        document.f1.t1a.value= vs; document.f1.t1b.value= i; document.f1.t1c.value= i*i*R;
        document.f1.t1d.value= i * R; document.f1.t1e.value= i * wL; document.f1.t1f.value= i * wC;
        document.f1.t1g.value= theta; document.f1.t1h.value= pf;
    }
    else if (count==2)
    {
        document.f1.t2a.value= vs; document.f1.t2b.value= i; document.f1.t2c.value= i*i*R;
        document.f1.t2d.value= i * R; document.f1.t2e.value= i * wL; document.f1.t2f.value= i * wC;
        document.f1.t2g.value= theta; document.f1.t2h.value= pf;
    }
    else if (count==3)
    {
        document.f1.t3a.value= vs; document.f1.t3b.value= i; document.f1.t3c.value= i*i*R;
        document.f1.t3d.value= i * R; document.f1.t3e.value= i * wL; document.f1.t3f.value= i * wC;
        document.f1.t3g.value= theta; document.f1.t3h.value= pf;
    }
    else if (count==4)
    {
        document.f1.t4a.value= vs; document.f1.t4b.value= i; document.f1.t4c.value= i*i*R;
        document.f1.t4d.value= i * R; document.f1.t4e.value= i * wL; document.f1.t4f.value= i * wC;
        document.f1.t4g.value= theta; document.f1.t4h.value= pf;
    }
    else
    {
        document.f1.t5a.value= vs; document.f1.t5b.value= i; document.f1.t5c.value= i*i*R;
        document.f1.t5d.value= i * R; document.f1.t5e.value= i * wL; document.f1.t5f.value= i * wC;
        document.f1.t5g.value= theta; document.f1.t5h.value= pf;
    }


}





