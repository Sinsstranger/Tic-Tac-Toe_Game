import './assets/css/main.scss';

if(module.hot){
	module.hot.accept((err) => {
		if(err){
			console.log('HMR', err)
		}
		// Перерисовываем UI
	})
}