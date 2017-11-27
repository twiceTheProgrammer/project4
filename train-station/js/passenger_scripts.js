$(document).ready(function(){
  let waiting_passengers = [
   {
      id:1,
      name: 'Mish',
      height : 6,
      skin_colour: 'brown',
      age: 25,
      sex : 1
   },
   {
     id:2,
     name: 'Becky',
     height : 5.8,
     skin_colour: 'brown',
     age: 22,
     sex : 0
   },
   {
     id:3,
     name: 'Sipho',
     height : 5.8,
     skin_colour: 'brown',
     age: 22,
     sex : 1
   },
   {
     id:4,
     name: 'Mandy',
     height : 5.8,
     skin_colour: 'brown',
     age: 22,
     sex : 0
   }
  ];
  let trains = [
   {
     number : 1001,
     direction: 'North',
     departure_time: '08:00',
     arrival_time: '09:20',
     stops: 7,
     capacity: 2,
     passengers : []
   },
   {
     number : 3005,
     direction: 'South',
     departure_time: '08:10',
     arrival_time: '09:05',
     stops: 5,
     capacity:2,
     passengers : []
   }
  ];
  function Train(train_data){

          this.number = train_data.number;
          this.direction = train_data.direction;
          this.departure_time = train_data.departure_time;
          this.arrival_time = train_data.arrival_time;
          this.stops = train_data.stops;
          this.capacity = train_data.capacity;
          this.passengers = train_data.passengers;
          this.board = function(passenger){
              var passengers_on_train = this.passengers.length ;
              if (  passengers_on_train > this.capacity  ){
                    alert('Train is full! wait for the next one...');
                    return false;
              }
              else {
                  this.passengers.push(passenger);
                  for (let index = 0 ; index < waiting_passengers.length ; index++){
                      if (waiting_passengers[index].id === passenger.id ){
                            waiting_passengers.splice(index , 1);
                      }
                  }
                  this.capacity -= 1;
                  return true;
              }
          }
          this.unboard = function(passenger_id){
              let unboarding_passenger = this.passengers.find(function(obj){
                    return obj.id === passenger_id ;
              });
              if ( unboarding_passenger.sex == false ){
                  for (let index = 0 ; index < final_southTrain_passengers.length ; index++){
                      if (final_southTrain_passengers[index].id === passenger_id ){
                          final_southTrain_passengers.splice(index , 1 );
                      }
                  }
                  waiting_passengers.push(unboarding_passenger);
                  unboarded_passengers.push(unboarding_passenger);
              }
              else {
                for (let index = 0 ; index < final_northTrain_passengers.length ; index++){
                    if (final_northTrain_passengers[index].id == passenger_id ){
                        final_northTrain_passengers.splice(index , 1 );
                    }
                }
                waiting_passengers.push(unboarding_passenger);
                unboarded_passengers.push(unboarding_passenger);

              }
          }
    }

  let southTrain_data = trains[1];
  let northTrain_data = trains[0];
  let southTrain = new Train(southTrain_data);
  let northTrain = new Train(northTrain_data);

let final_southTrain_passengers = [];
let final_northTrain_passengers = [];
let unboarded_passengers = []

for(let passenger of waiting_passengers){
      if (passenger.sex == false ){
        $('#waiting-list').append('<div><br><i class="fa fa-female" aria-hidden="true"></i>&nbsp; '+passenger.name+' <button class="btn btn-block btn-dark board-btn" data-passenger-sex="'+passenger.sex+'" data-passenger-id="'+passenger.id+'">Board</button></div>');
      }
      else {
        $('#waiting-list').append('<div><br><i class="fa fa-male" aria-hidden="true"></i>&nbsp; '+passenger.name+' <button class="btn btn-block btn-dark board-btn" data-passenger-sex="'+passenger.sex+'" data-passenger-id="'+passenger.id+'">Board</button></div>');
      }
}
$('.waitingList-total').html('<i class="fa fa-users" aria-hidden="true"></i>&nbsp;Total waiting passengers : ' + waiting_passengers.length );
$('.board-btn').on('click', function(){

      let clicked_button = $(this);
      clicked_button.parent().hide('slow');
      let passenger_sex = $(this).data('passenger-sex');
      let passenger_id = $(this).data('passenger-id');
      let passenger = waiting_passengers.find(function (obj) { return obj.id === passenger_id; });

      if ( passenger_sex == true ){
          if ( northTrain.board(passenger) == true ){
              final_northTrain_passengers.push(passenger);
              $('#north-train').append('<div><br><i class="fa fa-male" aria-hidden=true></i>&nbsp; '+passenger.name+' <button class="btn btn-block btn-danger unboard-btn" data-passenger-sex="'+passenger.sex+'" data-passenger-id="'+passenger.id+'">Unboard</button></div>');
          }
          $('.northTrain-capacity').html('Remaining seats : ' + northTrain.capacity);
          $('.northTrain-total').html('Onboard passengers : ' + final_northTrain_passengers.length);
      }
      else {
          if ( southTrain.board(passenger) == true ){
            final_southTrain_passengers.push(passenger);
            $('#south-train').append('<div><br><i class="fa fa-female" aria-hidden=true></i>&nbsp; '+passenger.name+' <button class="btn btn-block btn-danger unboard-btn" data-passenger-sex="'+passenger.sex+'" data-passenger-id="'+passenger.id+'">Unboard</button></div>');
          }
          $('.southTrain-total').html('Onboard passengers : ' + final_southTrain_passengers.length);
          $('.southTrain-capacity').html('Seats remaining : ' + southTrain.capacity );

      }
      $('.unboard-btn').on('click' , function(){

              let unboarding_passenger;
              $(this).parent().fadeOut(1200);
              let passenger_sex = $(this).data('passenger-sex');
              let passenger_id = $(this).data('passenger-id');

              if ( passenger_sex == false ){
                  southTrain.unboard(passenger_id);
                  unboarding_passenger = unboarded_passengers.find( function(obj){return obj.id === passenger_id});
                  $('#waiting-list').append('<div><br><i class="fa fa-female" aria-hidden="true"></i>&nbsp; '+unboarding_passenger.name+' <button class="btn btn-block btn-dark board-btn" data-passenger-sex="'+unboarding_passenger.sex+'" data-passenger-id="'+passenger.id+'">Reboard</button></div>');
                  $('.southTrain-total').html('Onboard passengers : ' + final_southTrain_passengers.length);
                  $('.southTrain-capacity').html('Seats remaining : ' + southTrain.capacity );
              }
              else {
                  northTrain.unboard(passenger_id);
                  unboarding_passenger = unboarded_passengers.find( function(obj){return obj.id === passenger_id});
                  $('#waiting-list').append('<div><br><i class="fa fa-male" aria-hidden="true"></i>&nbsp; '+unboarding_passenger.name+' <button class="btn btn-block btn-dark board-btn" data-passenger-sex="'+unboarding_passenger.sex+'" data-passenger-id="'+passenger.id+'">Reboard</button></div>');
                  $('.northTrain-capacity').html('Remaining seats : ' + northTrain.capacity);
                  $('.northTrain-total').html('Onboard passengers : ' + final_northTrain_passengers.length);

              }
              $('.waitingList-total').html('<i class="fa fa-users" aria-hidden="true"></i>&nbsp;Total waiting passengers : ' + waiting_passengers.length );
      });

      $('.waitingList-total').html('<i class="fa fa-users" aria-hidden="true"></i>&nbsp;Total waiting passengers : ' + waiting_passengers.length );
});

});
