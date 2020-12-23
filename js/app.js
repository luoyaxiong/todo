(function (window) {
	'use strict';

	Vue.directive('focus', {
		// 当被绑定的元素插入到 DOM 中时……
		inserted: function (el) {
			// 聚焦元素
			el.focus()
		}
	})
	// Your starting point. Enjoy the ride!
	const todos = [{
			id: 1,
			title: 'eat',
			completed: false
		},
		{
			id: 2,
			title: 'play',
			completed: false
		},
		{
			id: 3,
			title: 'music',
			completed: false
		}
	]
	window.app = new Vue({
		el: '#app',
		data() {
			return {
				todos: JSON.parse(window.localStorage.getItem('todos') || '[]'),
				toggleAll: false,
				currentEditing: null,
				filterText: ''
			}
		},
		computed: {
			allCompleted() {
				return this.todos.some(e => e.completed === true)
			},
			leftItemLength() {
				return this.todos.filter(e => e.completed === false).length
			},
			filterTodos() {
				switch (this.filterText) {
					case 'active':
						return this.todos.filter(e => e.completed === false)
					case 'completed':
						return this.todos.filter(e => e.completed === true)
					default:
						return this.todos
				}
			}
		},
		watch: {
			todos: {
				handler: function (val, oldVal) {
					this.toggleAll = this.todos.every(e => e.completed === true)
					window.localStorage.setItem('todos', JSON.stringify(this.todos))
				},
				deep: true
			}
		},
		methods: {
			handleEnterTodo(e) {
				const target = e.target
				const value = target.value.trim()
				if (value) {
					this.todos.push({
						id: this.todos.length ? this.todos[this.todos.length - 1].id + 1 : 0,
						title: value,
						completed: false
					})
				}
			},
			handleToggleAllTodos(ele) {

				this.todos.forEach(e => {
					e.completed = ele.target.checked
				});

			},
			handleDeleteTodo(index) {
				this.todos.splice(index, 1)
			},
			handleEditingDbclick(todo) {
				this.currentEditing = todo
			},
			handleEditEnter(index, e) {
				this.currentEditing = null
				const target = e.target
				const value = target.value.trim()
				if (value) {
					this.todos[index].title = value
				} else {
					this.todos.splice(index, 1)
				}
			},
			handleEditEsc() {
				this.currentEditing = null
			},
			handleClearCompleted() {
				const not_completed = this.todos.filter(e => e.completed === false)
				this.todos = not_completed
			}
		},
	})


	handleHashChange()
	window.onhashchange = handleHashChange
	function handleHashChange(){
		app.filterText = window.location.hash.substr(2)
	}
	onhashchange()
})(window);
