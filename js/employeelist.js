/*var serviceURL = '../services/';*/




var employees;

$('#employeeListPage').bind('pageinit', function(event) {
	getEmployeeList();
});

function getEmployeeList() {


	$.ajax({
		url: serviceURL + 'getemployees.php',
		//data: {json:1, appli:appliName, ver: appliVersion, put:'etat_push', token:token, uuid:device_uuid, info:info, data: data},
		dataType: 'json',
		crossDomain: true,
		type: "POST",
		success: function(data) {
			console.log(data);
			$('#employeeList li').remove();

			console.log(data.items);

			employees = data.items;
			$.each(employees, function(index, employee) {
				$('#employeeList').append('<li><a href="employeedetails.html?id=' + employee.id + '">' +
				'<img src="' + mediaURL + 'pics/' + employee.picture + '"/>' +
				'<h4>' + employee.firstName + ' ' + employee.lastName + '</h4>' +
				'<p>' + employee.title + '</p>' +
				'<span class="ui-li-count">' + employee.reportCount + '</span></a></li>');
			});
			$('#employeeList').listview('refresh');
		}
	});

}
