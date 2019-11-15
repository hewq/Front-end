{
	let date = new Date();
	let todayNum = date.getDate();
	let todayWeek = date.getDay();
	let year = date.getFullYear();
	let month = date.getMonth() + 1;
	let daysOfMonth = 30;
	let arr31 = [1, 3, 5, 7, 8, 10, 12];

	let curYear = year,
		curMonth = month,
		curTodayNum = todayNum,
		curTodayWeek = todayWeek;

	let curIpt;

	function setCalendar(parent, year, month, todayNum, todayWeek, hasActive) {
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
		} else {
			daysOfMonth = 30;
		}

		let table = `
		<table class="e-table">
			<tr>
				<td class="prev-month"><</td>
				<td colspan="5"><span>${year}</span>年<span>${month}</span>月</td>
				<td class="next-month">></td>
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
		$(table).appendTo(parent);
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
			tdStart += '<td class="has-num">' + index + '</td>';
		}

		let tr = `<tr>${tdSpace}${tdStart}</tr>`;
		if (weekOfOne !== 7) {
			$table.append(tr);
		}

		for (let j = 0; j < 5; j++) {
			tdStart = '';
			for (let i = 0; i < 7; i++) {
				if (index === daysOfMonth) break;
				if (index === todayNum - 1 && hasActive) {
					tdStart += '<td class="has-num active">' + (++index) + '</td>';
				} else {
					tdStart += '<td class="has-num">' + (++index) + '</td>';
				}
			}
			$table.append(`<tr>${tdStart}</tr>`);
			if (index === daysOfMonth) break;
		}
	}

	function formatDate(year, month, day) {
		return year + '-' + month + '-' + day;
	}

	$(document).on('click', '.prev-month', function () {
		if (curMonth === 1) {
			curMonth = 12;
			curYear--;
		} else {
			curMonth--;
		}

		let date = new Date(curYear + '-' + curMonth + '-' + '1');

		curTodayNum = date.getDate();
		curTodayWeek = date.getDay();

		$('.e-table').remove();
		setCalendar(curIpt.parent(), curYear, curMonth, curTodayNum, curTodayWeek, false);
	});

	$(document).on('click', '.next-month', function () {
		if (curMonth === 12) {
			curMonth = 1;
			curYear++;
		} else {
			curMonth++;
		}

		let date = new Date(formatDate(curYear, curMonth, 1));

		curTodayNum = date.getDate();
		curTodayWeek = date.getDay();

		$('.e-table').remove();
		setCalendar(curIpt.parent(), curYear, curMonth, curTodayNum, curTodayWeek, false);
	});

	$(document).on('click', '.has-num', function () {
		curIpt.val(formatDate(curYear, curMonth, $(this).html()));
		$('.e-table').remove();
	});

	$('.ipt-calendar').on('click', function () {
		$('.e-table').remove();
		curIpt = $(this);
		setCalendar(curIpt.parent(), year, month, todayNum, todayWeek, true);
	});
}