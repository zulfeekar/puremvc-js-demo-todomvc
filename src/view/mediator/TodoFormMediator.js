/**
 * @author Mike Britton
 * 
 * @class TodoFormMediator
 * @link https://github.com/mbritton/todopuremvc.git
 * 
 * 
 */

puremvc.define
(
    {
        name:'todomvc.view.mediator.TodoFormMediator',
        parent:puremvc.Mediator
    },
 
    // INSTANCE MEMBERS
    {
        // Notifications this mediator is interested in 
        listNotificationInterests: function() {
            return [ todomvc.AppConstants.TODOS_RETURNED ];
        },
        
        // Code to be executed when the Mediator instance is registered with the View
        onRegister: function() {
            this.setViewComponent( new todomvc.view.component.TodoForm );
            
            this.viewComponent.addEventListener( todomvc.view.component.TodoForm.TOGGLE_COMPLETE, this );
            this.viewComponent.addEventListener( todomvc.view.component.TodoForm.TOGGLE_COMPLETE_ALL, this );
            this.viewComponent.addEventListener( todomvc.view.component.TodoForm.UPDATE_ITEM, this );
            this.viewComponent.addEventListener( todomvc.view.component.TodoForm.DELETE_ITEM, this );
            this.viewComponent.addEventListener( todomvc.view.component.TodoForm.ADD_ITEM, this );
            this.viewComponent.addEventListener( todomvc.view.component.TodoForm.CLEAR_COMPLETED, this );
        },
 
        handleEvent: function (event) {
            
            switch(event.type) {
                case todomvc.view.component.TodoForm.TOGGLE_COMPLETE_ALL:
                    this.sendNotification( todomvc.AppConstants.TOGGLE_TODO_STATUS, event.doToggleComplete );
                    break;
 
                case todomvc.view.component.TodoForm.UPDATE_ITEM:
                    this.sendNotification(todomvc.AppConstants.UPDATE_TODO, event.todo);
                    break;
 
                case todomvc.view.component.TodoForm.DELETE_ITEM:
                    this.sendNotification( todomvc.AppConstants.DELETE_TODO, event.todoid);
                    break;
 
                case todomvc.view.component.TodoForm.ADD_ITEM:
                    this.sendNotification( todomvc.AppConstants.ADD_TODO, event.todo );
                    break;
 
                case todomvc.view.component.TodoForm.CLEAR_COMPLETED:
                    this.sendNotification( todomvc.AppConstants.REMOVE_TODOS_COMPLETED );
                    break;
 
                case todomvc.view.component.TodoForm.TOGGLE_COMPLETE:
                    this.sendNotification( todomvc.AppConstants.UPDATE_TODO, event.todo );
                    break;
            }
            
        },
 
        /** @override */
        handleNotification: function(note) {
            switch ( note.getName() ) {
                case todomvc.AppConstants.TODOS_RETURNED:
                    this.viewComponent.redraw(note.getBody());
                    break;
            }
        },
    },
 
    // STATIC MEMBERS
    {
        /**
         * @static
         * @type {string}
         */
        NAME: 'ContentMediator'
    }    
);