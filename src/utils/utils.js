import config from './config';

const DATATYPE = {
  ALLDATATYPE: "1",
  VIDEODATATYPE: "41",
  PICTUREDATATYPE: "10",
  TEXTDATATYPE: "29",
  VOICEDATATYPE: "31"
}

function fetchData (method='GET',parameters,target,type,loaded) {
	
		
		fetch(config.baseURL + (method=="GET"?"?":"") + parameters)
		.then((response) => {
			
			return response.json();
		})
		.then((data) => {
			
			if (loaded==true) {return;}
			switch(type){
				case DATATYPE.ALLDATATYPE :
				target.setState({
    				allData: data.list,
    				isLoaded: true
  				});
  				break;
  				case DATATYPE.VIDEODATATYPE :
  				
  				target.setState({
    				videoData: data.list,
    				isLoaded: true
  				});
  				break;
  				case DATATYPE.PICTUREDATATYPE :
  				target.setState({
    				imgData: data.list,
    				isLoaded: true
  				});
  				break;
  				case DATATYPE.TEXTDATATYPE :
  				target.setState({
    				txtData: data.list,
    				isLoaded: true
  				});
  				break;
  				

			}
			
		});
	
}

function fetchComment (method='GET',parameters,target) {
	fetch(config.baseURL + (method=="GET"?"?":"") + parameters)
		.then((response) => {
			
			return response.json();
		})
		.then((data) => {
			console.log(data.data);
			target.setState({
				commentdata: data.data
			});
			
		});
}

export {fetchData,fetchComment};
