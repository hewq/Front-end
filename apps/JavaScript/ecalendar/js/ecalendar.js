{
	let date = new Date();
	let todayNum = date.getDate();
	let todayWeek = date.getDay();
	let year = date.getFullYear();
	let month = date.getMonth() + 1;
	let daysOfMonth = 30;
	let arr31 = [1, 3, 5, 7, 8, 10, 12];

	if (todayWeek === 0) {
		todayWeek = 7;
	}

	let weekOfOne = todayWeek - (todayNum % 7 - 1);
	if (weekOfOne <= 0) {
		weekOfOne += 7;
	}

	if (month == 2) {
		if (year % 4 === 0) {
			daysOfMonth = 29;
		} else {
			daysOfMonth = 28;
		}
	} else if (arr31.indexOf(month) !== -1) {
		daysOfMonth = 31;
	}

	let table = `
		<table class="e-table">
			<tr>
				<td colspan="7"><span>${year}</span>年<span>${month}</span>月</td>
			</tr>
			<tr>
				<td>Sun</td>
				<td>Mon</td>
				<td>Tue</td>
				<td>Wed</td>
				<td>Thu</td>
				<td>Fri</td>
				<td>Sat</td>
			</tr>
		</table>`;
	$(table).appendTo('body');
	let $table = $('.e-table');

	let td = '<td></td>';
	let tdSpace = '',
		tdFirstLine = '';
	let tdStart = '';
	let index = 0;
	for (let i = 0; i < weekOfOne; i++) {
		tdSpace += td;
	}
	for (let i = 0; i < 7 - weekOfOne; i++) {
		index = i + 1;
		tdStart += '<td>' + index + '</td>';
	}

	let tr = `<tr>${tdSpace}${tdStart}</tr>`;
	$table.append(tr);

	for (let j = 0; j < 4; j++) {
		tdStart = '';
		for (let i = 0; i < 7; i++) {
			if (index === daysOfMonth) break;
			tdStart += '<td>' + (++index) + '</td>';
		}
		$table.append(`<tr>${tdStart}</tr>`);
		if (index === daysOfMonth) break;
	}
}